# JS-TextDiff
Using [PDFTron's WebViewer SDK](https://www.pdftron.com/documentation/web), extract text from two PDFs and compare any of the text differences using [diff-match-patch](https://github.com/google/diff-match-patch). 

![Screenshot](/files/screenshot.png)

You can compare the PDFs from local file storage, sample files provided or two URLs.

### Installing
Download or clone repository, unzip and in terminal navigate to the unzipped folder. Inside of it run: 

```
npm install -g http-server
```

then

```
http-server -a localhost
```

and the app will be running on http://localhost:8080.
