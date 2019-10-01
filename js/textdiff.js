const loadPDFs = (firstPDF, secondPDF, local) => {
    CoreControls.setWorkerPath('../lib/core');

    var doc1 = new CoreControls.Document('firstPDF.pdf', 'pdf');
    var doc2 = new CoreControls.Document('secondPDF.pdf', 'pdf');

    var text1 = document.getElementById('text1');
    var text2 = document.getElementById('text2');

    const pageIndex = 0; // Extract the text in the first page

    CoreControls.getDefaultBackendType().then(function (backendType) {
        var options = {
            workerTransportPromise: CoreControls.initPDFWorkerTransports(backendType, {}, window.sampleL /* license key here */ ),
        };

        var partRetriever1, partRetriever2;

        if (local){
            partRetriever1 = new CoreControls.PartRetrievers.LocalPdfPartRetriever(firstPDF);
            partRetriever2 = new CoreControls.PartRetrievers.LocalPdfPartRetriever(secondPDF);
        } else {
            partRetriever1 = new CoreControls.PartRetrievers.ExternalPdfPartRetriever(firstPDF);
            partRetriever2 = new CoreControls.PartRetrievers.ExternalPdfPartRetriever(secondPDF);
        }


        doc1.loadAsync(partRetriever1, function (err) {
            if (err) {
                return;
            }

            doc1.loadPageText(pageIndex, (text) => {
                text1.innerHTML = text;
              });
        }, options);

        doc2.loadAsync(partRetriever2, function (err) {
            if (err) {
                return;
            }
            doc2.loadPageText(pageIndex, (text) => {
                text2.innerHTML = text;
                compareText(text1.innerHTML, text2.innerHTML);
              });
        }, options);


    });
}

const compareText = (text1, text2) => {
    var textDiff = document.getElementById('textdiff');
    console.log(text1);
    console.log(text2);
    var dmp = new diff_match_patch();
    var diff = dmp.diff_main(text1, text2);
    textDiff.innerHTML = dmp.diff_prettyHtml(diff);
}

window.onload = () => {
    document.getElementById('sample').onsubmit = function (e) {
        e.preventDefault();
        const firstPdf = '../files/TextDiff.pdf';
        const secondPdf = '../files/TextDiffChanged.pdf';

        loadPDFs(firstPdf, secondPdf, false);
    };

    document.getElementById('url-form').onsubmit = function (e) {
        e.preventDefault();
        const firstPdf = document.getElementById('url').value;
        const secondPdf = document.getElementById('url2').value;

        loadPDFs(firstPdf, secondPdf, false);
    };

    document.getElementById('file-picker-form').onsubmit = function (e) {
        e.preventDefault();
        const firstPdf = document.forms['file-picker-form'][0].files[0];
        const secondPdf = document.forms['file-picker-form'][1].files[0];

        loadPDFs(firstPdf, secondPdf, true);
    };
};