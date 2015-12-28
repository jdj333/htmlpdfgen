// Author James Jenkins

function htmlpdfgen(elements) {
		console.log(elements);
		//var elements = document.getElementByClassName("pdf-area").getElementsByTagName("div");

	  var pdfData = "data:application/pdf;base64,";
		var creationDate = new Date();
		//canvas width & height
		var pdfWidth = "612.00";
		var pdfHeight = "792.00";
		//compatibility version
		var pdfVersion = '1.3';
	  var pdfScript = "%PDF-"+pdfVersion +"\r\n";
		var headerUrl = "https://www.example.org";
	  pdfScript +=
		"3 0 obj\r\n" +
		"<</Type /Page\r\n" +
		"/Parent 1 0 R\r\n" +
		"/Resources 2 0 R\r\n" +
		"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
		"/Contents 4 0 R\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"4 0 obj\r\n" +
		//TODO: make length value dynamic
		"<</Length 196>>\r\n" +

		//start stream
		"stream\r\n" +
		"0.20 w\r\n" +
		"0 G\r\n" +
		"BT\r\n" +
		"/F1 8 Tf\r\n" +
		"9.2 TL\r\n" +
		"0 g\r\n" +
		"40.00 752.00 Td\r\n" +
		"("+headerUrl+") Tj\r\n" +
		"ET\r\n" +
		"q\r\n" +
		"q BT 0 g 40.00 725.50 Td\r\n" +
		"0 -29.70 Td\r\n";

		var xcoord = 40.00;
		var ycoord = 679.30;
		var yoffset = 46.20;
		for (var i = 0; i < elements.length; i++) {
		    //console.log(elements[i].innerHTML);
				pdfScript +=
				//font color (red)
				//"1.000 0.000 0.000 rg\r\n" +
				//font #, font size, (text output)
				"/F1 24.75 Tf (" + elements[i].innerHTML + ") Tj\r\n" +
				"ET Q\r\n" +
				//point x y
				"q BT 0 g 40.00 " + ycoord + " Td\r\n" +
				//margin
				"0 -29.70 Td\r\n";
				ycoord -= yoffset;
		}

		pdfScript +=
		"Q\r\n" +
		"endstream\r\n" +
		"endobj\r\n" +
		"1 0 obj\r\n" +
		"<</Type /Pages\r\n" +
		"/Kids [3 0 R ]\r\n" +
		"/Count 1\r\n" +
		">>\r\n" +
		"endobj\r\n" +

		//fonts
		"5 0 obj\r\n" +
		"<</BaseFont/Helvetica/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"6 0 obj\r\n" +
		"<</BaseFont/Helvetica-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"7 0 obj\r\n" +
		"<</BaseFont/Helvetica-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"8 0 obj\r\n" +
		"<</BaseFont/Helvetica-BoldOblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"9 0 obj\r\n" +
		"<</BaseFont/Courier/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"10 0 obj\r\n" +
		"<</BaseFont/Courier-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"11 0 obj\r\n" +
		"<</BaseFont/Courier-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"12 0 obj\r\n" +
		"<</BaseFont/Courier-BoldOblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"13 0 obj\r\n" +
		"<</BaseFont/Times-Roman/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"14 0 obj\r\n" +
		"<</BaseFont/Times-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"15 0 obj\r\n" +
		"<</BaseFont/Times-Italic/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"16 0 obj\r\n" +
		"<</BaseFont/Times-BoldItalic/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		//end fonts

		"2 0 obj\r\n" +
		"<<\r\n" +
		"/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]\r\n" +
		"/Font <<\r\n" +
		"/F1 5 0 R\r\n" +
		"/F2 6 0 R\r\n" +
		"/F3 7 0 R\r\n" +
		"/F4 8 0 R\r\n" +
		"/F5 9 0 R\r\n" +
		"/F6 10 0 R\r\n" +
		"/F7 11 0 R\r\n" +
		"/F8 12 0 R\r\n" +
		"/F9 13 0 R\r\n" +
		"/F10 14 0 R\r\n" +
		"/F11 15 0 R\r\n" +
		"/F12 16 0 R\r\n" +
		">>\r\n" +
		"/XObject <<\r\n" +
		">>\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"17 0 obj\r\n" +
		"<<\r\n" +
		"/Producer (pdfGen jamesjenkins)\r\n" +
		"/CreationDate (D:"+creationDate+")\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"18 0 obj\r\n" +
		"<<\r\n" +
		"/Type /Catalog\r\n" +
		"/Pages 1 0 R\r\n" +
		"/OpenAction [3 0 R /FitH null]\r\n" +
		"/PageLayout /OneColumn\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"xref\r\n" +
		"0 19\r\n" +
		"0000000000 65535 f\r\n" +
		"0000000364 00000 n\r\n" +
		"0000001563 00000 n\r\n" +
		"0000000009 00000 n\r\n" +
		"0000000118 00000 n\r\n" +
		"0000000421 00000 n\r\n" +
		"0000000511 00000 n\r\n" +
		"0000000606 00000 n\r\n" +
		"0000000704 00000 n\r\n" +
		"0000000806 00000 n\r\n" +
		"0000000894 00000 n\r\n" +
		"0000000988 00000 n\r\n" +
		"0000001085 00000 n\r\n" +
		"0000001186 00000 n\r\n" +
		"0000001279 00000 n\r\n" +
		"0000001371 00000 n\r\n" +
		"0000001465 00000 n\r\n" +
		"0000001787 00000 n\r\n" +
		"0000001906 00000 n\r\n" +
		"trailer\r\n" +
		"<<\r\n" +
		"/Size 19\r\n" +
		"/Root 18 0 R\r\n" +
		"/Info 17 0 R\r\n" +
		">>\r\n" +
		"startxref\r\n" +
		"2010\r\n";
		// pdf end of file
		pdfScript += "%%EOF";

		pdfData += btoa(pdfScript);

		window.open(pdfData,"_blank");
};

//triggers htmlpdfgen
//htmlpdfgen(".pdf-area");
