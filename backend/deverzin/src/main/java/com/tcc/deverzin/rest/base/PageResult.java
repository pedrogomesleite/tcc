// The file will be created to hold a generic page result used by listarPaginado
package com.tcc.deverzin.rest.base;

import java.util.List;

public class PageResult<T> {
    private List<T> data;
    private long totalRecords;

    public PageResult() {
    }

    public PageResult(List<T> data, long totalRecords) {
        this.data = data;
        this.totalRecords = totalRecords;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }
}

