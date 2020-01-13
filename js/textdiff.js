const loadPDFs = async (firstPDF, secondPDF) => {
    CoreControls.setWorkerPath('../lib/core');

    var text1 = document.getElementById('text1');
    var text2 = document.getElementById('text2');

    const pageIndex = 0; // Extract the text in the first page

    const doc1 = await CoreControls.createDocument(firstPDF, {});
    const doc2 = await CoreControls.createDocument(secondPDF, {});

    doc1.loadPageText(pageIndex, (text) => {
        text1.innerHTML = text;
      })
    doc2.loadPageText(pageIndex, (text) => {
        text2.innerHTML = text;
        compareText(text1.innerHTML, text2.innerHTML);
    });
}

const compareText = (text1, text2) => {
    var textDiff = document.getElementById('textdiff');
    var dmp = new diff_match_patch();
    var diff = dmp.diff_main(text1, text2);
    textDiff.innerHTML = dmp.diff_prettyHtml(diff);
}

window.onload = () => {
    document.getElementById('sample').onsubmit = function (e) {
        e.preventDefault();
        const firstPdf = '../files/TextDiff.pdf';
        const secondPdf = '../files/TextDiffChanged.pdf';

        loadPDFs(firstPdf, secondPdf);
    };

    document.getElementById('url-form').onsubmit = function (e) {
        e.preventDefault();
        const firstPdf = document.getElementById('url').value;
        const secondPdf = document.getElementById('url2').value;

        loadPDFs(firstPdf, secondPdf);
    };

    document.getElementById('file-picker-form').onsubmit = function (e) {
        e.preventDefault();
        const firstPdf = document.forms['file-picker-form'][0].files[0];
        const secondPdf = document.forms['file-picker-form'][1].files[0];

        loadPDFs(firstPdf, secondPdf);
    };
};