new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
}).then(t => console.log(1));
console.log(3);

function fileTemplateFilter() {
    return Observable.create(observable => {
        this.uploader.options.filters.push({
            name: "fileTemplateFilter",
            fn: (item, options) => {
                var type = item.type || null;
                if (type == "application/pdf") return of(true);
                this.fileUploadLoader = true;
                return Observable.forkJoin([
                    this.getCsvHeaders(item.name, 1),
                    this.getFileHeaders(item.rawFile)
                ]).pipe(
                    map(
                        ([fileHeaders, tableHeaders]) =>
                            fileHeaders.length == tableHeaders.length &&
                            fileHeaders.every(function(element, index) {
                                return element === tableHeaders[index];
                            })
                    ),
                    tap(isSame => {
                        // this is a side effect, and should not be here actually!
                        this.fileUploadLoader = !isSame;
                    })
                );
            }
        });
    });
}
