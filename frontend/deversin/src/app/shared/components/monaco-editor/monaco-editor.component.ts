import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';


declare global {
  interface Window { require: any; monaco: any; }
}

@Component({
  selector: 'monaco-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, CardModule],
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss']
})
export class MonacoEditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef<HTMLDivElement>;

  @Input() value = '';
  @Input() language = 'java';
  @Input() options: any = {};
  @Input() height = '600px';
  @Input() readOnly = false;
  @Input() showLanguageSelector = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() editorInit = new EventEmitter<any>();
  @Output() languageChange = new EventEmitter<string>();

  availableLanguages: Array<{ id: string; label: string }> = [];
  availableLanguageOptions: Array<{ label: string; value: string }> = [];

  private editor: any = null;
  private monaco: any = null;
  private completionProviderDisposable: any = null;

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.editor) return;

    if (changes['value'] && !changes['value'].firstChange) {
      const newVal = changes['value'].currentValue;
      if (newVal !== this.getValue()) {
        this.editor.setValue(newVal ?? '');
      }
    }

    if (changes['language'] && !changes['language'].firstChange && this.monaco) {
      const normalized = (this.language || 'plaintext').toString().toLowerCase();
      try {
        const model = this.editor.getModel();
        this.monaco.editor.setModelLanguage(model, normalized);
        this.language = normalized;
      } catch (e) {
        // ignore
      }
    }

    if (changes['readOnly'] && !changes['readOnly'].firstChange) {
      try { this.editor.updateOptions({ readOnly: this.readOnly }); } catch (e) {}
    }

    if (changes['height'] && !changes['height'].firstChange) {
      this.editorContainer.nativeElement.style.height = this.height;
      setTimeout(() => this.editor.layout(), 50);
    }
  }

  ngOnDestroy(): void {
    try {
      if (this.editor) {
        this.editor.dispose();
        this.editor = null;
      }
    } catch (e) {}

    try {
      if (this.completionProviderDisposable && this.completionProviderDisposable.dispose) {
        this.completionProviderDisposable.dispose();
        this.completionProviderDisposable = null;
      }
    } catch (e) {}
  }

  private init() {
    this.loadMonacoFromCdn()
      .then(monaco => {
        this.monaco = monaco;
        // try to get languages from monaco, fallback to a small set
        try {
          const langs = this.monaco.languages.getLanguages();
          this.availableLanguages = langs.map((l: any) => ({ id: l.id, label: (l.aliases && l.aliases[0]) || l.id }));
        } catch (e) {
          this.availableLanguages = [
            { id: 'java', label: 'Java' },
            { id: 'javascript', label: 'JavaScript' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'json', label: 'JSON' },
            { id: 'plaintext', label: 'Plain Text' }
          ];
        }

        this.availableLanguageOptions = this.availableLanguages.map(l => ({ label: l.label, value: l.id }));

        console.log(this.availableLanguageOptions);
        // normalize incoming language to an available id
        const normalized = this.language ? this.language.toString().toLowerCase() : 'java';
        const found = this.availableLanguages.find(l => l.id === normalized);
        this.language = found ? found.id : 'java';

        this.createEditor();
        this.applyLanguageAndFeatures(this.language);
      })
      .catch(err => {
        console.error('Failed to load Monaco editor:', err);
        this.editorInit.emit(null);
      });
  }

  private loadMonacoFromCdn(): Promise<any> {
    if ((window as any).monaco) return Promise.resolve((window as any).monaco);

    return new Promise((resolve, reject) => {
      const baseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/';
      const loaderUrl = baseUrl + 'vs/loader.js';

      const existing = document.querySelector('script[data-monaco-loader]');
      if (existing) {
        const wait = () => {
          if ((window as any).monaco) resolve((window as any).monaco);
          else setTimeout(wait, 50);
        };
        wait();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = loaderUrl;
      script.setAttribute('data-monaco-loader', 'true');
      script.onload = () => {
        try {
          (window as any).require.config({ paths: { 'vs': baseUrl + 'vs' } });
          (window as any).require(['vs/editor/editor.main'], () => resolve((window as any).monaco));
        } catch (e) { reject(e); }
      };
      script.onerror = () => reject(new Error('Failed to load Monaco loader script'));
      document.body.appendChild(script);
    });
  }

  private createEditor() {
    const host = this.editorContainer.nativeElement;
    host.style.height = this.height || '400px';

    const initialLanguage = this.language || 'plaintext';

    const editorOptions = {
      value: this.value ?? '',
      language: initialLanguage,
      readOnly: this.readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      wordBasedSuggestions: true,
      ...this.options
    };

    this.editor = this.monaco.editor.create(host, editorOptions);

    this.editor.onDidChangeModelContent(() => {
      const v = this.editor.getValue();
      this.valueChange.emit(v);
    });

    this.editorInit.emit(this.editor);
  }

  private applyLanguageAndFeatures(lang: string) {
    if (!this.monaco || !this.editor) return;
    const langId = (lang || 'plaintext').toString().toLowerCase();

    try {
      const model = this.editor.getModel();
      this.monaco.editor.setModelLanguage(model, langId);
    } catch (e) {}

    try {
      this.editor.updateOptions({ quickSuggestions: true, suggestOnTriggerCharacters: true, wordBasedSuggestions: true });
    } catch (e) {}

    // register a lightweight completion provider for Java
    try {
      if (this.completionProviderDisposable && this.completionProviderDisposable.dispose) {
        this.completionProviderDisposable.dispose();
        this.completionProviderDisposable = null;
      }

      if (this.monaco && this.monaco.languages && this.monaco.languages.registerCompletionItemProvider) {
        const keywords = ['class', 'public', 'private', 'protected', 'static', 'void', 'int', 'String', 'new', 'if', 'else', 'for', 'while', 'return'];
        const suggestions = keywords.map((k: string, idx: number) => ({
          label: k,
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          insertText: k,
          range: undefined
        }));

        suggestions.push({
          label: 'sysout',
          kind: this.monaco.languages.CompletionItemKind.Snippet,
          insertText: 'System.out.println(${1});',
          insertTextRules: this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        } as any);

        this.completionProviderDisposable = this.monaco.languages.registerCompletionItemProvider('java', {
          provideCompletionItems: (model: any, position: any) => {
            // Simple filter: provide suggestions that start with the current word
            const word = model.getWordUntilPosition(position);
            const prefix = word && word.word ? word.word.toLowerCase() : '';
            const filtered = suggestions.filter((s: any) => s.label.toLowerCase().startsWith(prefix));
            return { suggestions: filtered };
          }
        });
      }
    } catch (e) {
      // non-fatal
    }
  }

  setLanguage(lang: string) {
    if (!lang) return;
    const normalized = lang.toString().toLowerCase();
    this.language = normalized;
    if (this.editor && this.monaco) {
      try {
        const model = this.editor.getModel();
        this.monaco.editor.setModelLanguage(model, normalized);
      } catch (e) {}
      this.applyLanguageAndFeatures(normalized);
    }
    this.languageChange.emit(normalized);
  }

  getValue(): string {
    return this.editor ? this.editor.getValue() : (this.value ?? '');
  }
}
