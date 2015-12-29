// Author James Jenkins

function htmlpdfgen(elements) {
	  var pdfData = "data:application/pdf;base64,";
		var creationDate = new Date();
		//canvas width & height
		var pdfWidth = "612.00";
		var pdfHeight = "792.00";
		//compatibility version
		var pdfVersion = '1.3';
	  var pdfScript = "%PDF-"+pdfVersion +"\r\n";
		var headerUrl = "https://www.example.org";
		var pageCount = 1;
		var objectNum = 3;

		pdfScript +=
		objectNum + " 0 obj\r\n" + //object 3
		"<</Type /Page\r\n" +
		"/Parent 1 0 R\r\n" +
		"/Resources 2 0 R\r\n" +
		"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
		"/Contents 4 0 R\r\n" +
		">>\r\n" +
		"endobj\r\n" +
		"4 0 obj\r\n" + //object 4
		//TODO: make length value dynamic
		"<</Length 1490>>\r\n" +
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
		var yoffsetparagraph = 16.80;
    var content = "";
		for (var i = 0; i < elements.length; i++) {
			tagName = elements[i].tagName;
			fontColor = elements[i].style.color;
			content = elements[i].innerHTML;
			recognizedElement = true;

			//get/set font color
			if(fontColor == 'red') {
				pdfScript += "1.000 0.000 0.000 rg\r\n";
			} else if(fontColor == 'green') {
				pdfScript += "0.000 1.000 0.000 rg\r\n";
			} else if(fontColor == 'blue') {
				pdfScript += "0.000 0.000 1.000 rg\r\n";
			} else {
				pdfScript += "0.000 0.000 0.000 rg\r\n"; //black
			}

			//set font sizes based on tagName
			if(tagName == "H1") {
					console.log("H1 content length: " + content.length);
					pdfScript += "/F1 24.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "H2") {
				  console.log("H2 content length: " + content.length);
				  pdfScript += "/F1 21.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "P") {
					console.log("P content length: " + content.length);

					var charStart = 0;
					var slicedContent;

					while(content.length > charStart) {
						slicedContent = content.slice(charStart, charStart + 90);
						charStart += 90;
						nextSlicedContent = content.slice(charStart, charStart + 90);

						nextStart = nextSlicedContent.charAt(0);
						end = slicedContent.charAt(slicedContent.length -1);

						slicedContent = slicedContent.trim();
						if(end.indexOf(' ') === -1 && nextStart.indexOf(' ') === -1 && nextStart !== ''){
									slicedContent += '-';
						}

						pdfScript += "/F1 12.75 Tf (" + slicedContent + ") Tj\r\n";
						pdfScript +=
						"ET Q\r\n" +
						"q BT 0 g 40.00 " + ycoord + " Td\r\n";
						ycoord -= yoffsetparagraph;

						//start new page if element y position has reached bottom
						//reset y to top
						if(ycoord < 60.00) {
							var ycoord = 679.30;
							pageCount++;
							//end stream
							pdfScript +=
							"ET Q\r\n" +
							"endstream\r\n" +
							"endobj\r\n" +
							"5 0 obj\r\n" +
							"<</Type /Page\r\n" +
							"/Parent 1 0 R\r\n" +
							"/Resources 2 0 R\r\n" +
							"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
							"/Contents 6 0 R\r\n" +
							">>\r\n" +
							"endobj\r\n";
							//start new stream
							pdfScript +=
							"6 0 obj\r\n" + //object 4
							//TODO: make length value dynamic
							"<</Length 1490>>\r\n" +
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
						}


					}

			} else {
				// do not render other elements...
				recognizedElement = false;
			}

			if(recognizedElement==true) {
				pdfScript +=
				"ET Q\r\n" +
				"q BT 0 g 40.00 " + ycoord + " Td\r\n" +
				"0 -29.70 Td\r\n";
				ycoord -= yoffset;
			}

			//start new page if element y position has reached bottom
			//reset y to top
			if(ycoord < 60.00) {
				var ycoord = 679.30;
				pageCount++;
				//end stream
				pdfScript +=
				"ET Q\r\n" +
				"endstream\r\n" +
				"endobj\r\n" +
				"5 0 obj\r\n" + //object 5
				"<</Type /Page\r\n" +
				"<</Type /Page\r\n" +
				"/Parent 1 0 R\r\n" +
				"/Resources 2 0 R\r\n" +
				"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
				"/Contents 6 0 R\r\n" +
				">>\r\n" +
				"endobj\r\n";
				//start new stream
				pdfScript +=
				"6 0 obj\r\n" + //object 6
				//TODO: make length value dynamic
				"<</Length 1490>>\r\n" +
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
			}


			//end stream if last element
			if(i == elements.length -1){
				pdfScript +=
				"ET Q\r\n" +
				"Q\r\n" +
				"endstream\r\n" +
				"endobj\r\n" +
				"1 0 obj\r\n" +
				"<</Type /Pages\r\n" +
				"/Kids [3 0 R 5 0 R]\r\n" +
				"/Count "+pageCount+"\r\n" +
				">>\r\n" +
				"endobj\r\n";
			}

		}




		pdfScript +=
		//fonts
		"7 0 obj\r\n" +
		"<</BaseFont/Helvetica/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"8 0 obj\r\n" +
		"<</BaseFont/Helvetica-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"9 0 obj\r\n" +
		"<</BaseFont/Helvetica-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n" +
		"10 0 obj\r\n" +
		"<</BaseFont/Helvetica-BoldOblique/Type/Font\r\n" +
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
		"/F1 7 0 R\r\n" +
		"/F2 8 0 R\r\n" +
		"/F3 9 0 R\r\n" +
		"/F4 10 0 R\r\n" +
		"/F5 11 0 R\r\n" +
		"/F6 12 0 R\r\n" +
		"/F7 13 0 R\r\n" +
		"/F8 14 0 R\r\n" +
		"/F9 15 0 R\r\n" +
		"/F10 16 0 R\r\n" +
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
		"0 21\r\n" +
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
		"0000002106 00000 n\r\n" +
		"0000002306 00000 n\r\n" +
		"0000002506 00000 n\r\n" +
		"trailer\r\n" +
		"<<\r\n" +
		"/Size 21\r\n" +
		"/Root 18 0 R\r\n" +
		"/Info 17 0 R\r\n" +
		">>\r\n" +
		"startxref\r\n" +
		"2010\r\n";
		// pdf end of file
		pdfScript += "%%EOF";
		console.log(pdfScript);
		pdfData += btoa(pdfScript);

		window.open(pdfData,"_blank");
};

//triggers htmlpdfgen
//htmlpdfgen(".pdf-area");
