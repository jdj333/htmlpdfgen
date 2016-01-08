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
		var pageObjects = [3]; //starts with object 3
		var fontObjectNum = 0;
		var kids = "";
		var imgCount = 0;
		var xcoord = 40.00;
		var ycoord = 700.00;
		var yoffset = 36.20;
		var yoffsetparagraph = 16.80;
    var content = "";

		pdfScript +=
		objectNum + " 0 obj\r\n" + //object 3
		"<</Type /Page\r\n" +
		"/Parent 1 0 R\r\n" +
		"/Resources 2 0 R\r\n" +
		"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
		"/Contents 4 0 R\r\n" +
		">>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" + //object 4
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
		xcoord + " 752.00 Td\r\n" +
		"("+headerUrl+") Tj\r\n" +
		"ET\r\n" +
		"q\r\n" +
		"q BT 0 g "+xcoord+" 745.50 Td\r\n" +
		"0 -40.70 Td\r\n";

		for (var i = 0; i < elements.length; i++) {
			tagName = elements[i].tagName;
			fontColor = window.getComputedStyle(elements[i], null).color;
			//store rga as array
			fontColor = fontColor.replace(/[^\d,]/g, '').split(',');
			//convert to pdf rgb values
			for(var c = 0; c < fontColor.length; c++) {
					fontColor[c] = (fontColor[c] / 255).toFixed(3);
			}
			content = elements[i].innerHTML;
			recognizedElement = true;
			//set font color
			pdfScript += fontColor[0] + " " + fontColor[1] + " " + fontColor[2] + " rg\r\n";

			//set font sizes based on tagName
			if(tagName == "IMG") {
					//set image position & size
					img = elements[i];
					imgCount++;

					pdfScript +=
					"q BT 0 g 40.00 " + ycoord + " Td\r\n" +
					"q 400.00 0 0 200.00 40.00 "+(ycoord - (img.height-30))+" cm /I0 Do Q\r\n";
					//ycoord offset & bottom margin
					ycoord -= img.height;

			} else if(tagName == "H1") {
					pdfScript += "/F1 24.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "H2") {
				  pdfScript += "/F1 21.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "H3") {
					pdfScript += "/F1 18.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "H4") {
					pdfScript += "/F1 16.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "H5") {
					pdfScript += "/F1 15.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "H6") {
					pdfScript += "/F1 14.75 Tf (" + content + ") Tj\r\n";
			} else if(tagName == "P") {

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
						ycoord -= yoffsetparagraph.toFixed(2);

						//start new page if element y position has reached bottom
						//reset y to top
						if(ycoord < 50.00) {
							ycoord = 719.30;
							pageCount++;
							//end pag stream

							pdfScript +=
							"ET Q\r\n" +
							"endstream\r\n" +
							"endobj\r\n";

							objectNum++;
							pageObjects.push(objectNum);
							pdfScript +=
							objectNum + " 0 obj\r\n" + // new page object
							"<</Type /Page\r\n" +
							"/Parent 1 0 R\r\n" +
							"/Resources 2 0 R\r\n" +
							"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
							"/Contents 6 0 R\r\n" +
							">>\r\n" +
							"endobj\r\n";
							//start new stream
							objectNum++;
							pdfScript +=
							objectNum + " 0 obj\r\n" + // new page object
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
							"40.00 765.00 Td\r\n" +
							"ET\r\n" +
							"q\r\n" +
							"q BT 0 g 40.00 765.50 Td\r\n" +
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
				"0 -19.70 Td\r\n";
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
				"endobj\r\n";

				objectNum++;
				pageObjects.push(objectNum); // add page object num
				pdfScript +=
				objectNum + " 0 obj\r\n" + // new page object 1
				"<</Type /Page\r\n" +
				"/Parent 1 0 R\r\n" +
				"/Resources 2 0 R\r\n" +
				"/MediaBox [0 0 "+pdfWidth+" "+pdfHeight+"]\r\n" +
				"/Contents 6 0 R\r\n" +
				">>\r\n" +
				"endobj\r\n";
				//start new stream
				objectNum++;
				pdfScript +=
				objectNum + " 0 obj\r\n" + // new page object 2
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
				"ET\r\n" +
				"q\r\n" +
				"q BT 0 g 40.00 756.00 Td\r\n" +
				"0 -59.70 Td\r\n";
			}

			//end stream if last element
			if(i == elements.length -1){
				pdfScript +=
				"ET Q\r\n" +
				"Q\r\n" +
				"endstream\r\n" +
				"endobj\r\n" +
				"1 0 obj\r\n" + //object 1
				"<</Type /Pages\r\n";

				for (var p = 0; p < pageCount; p++) {
				    kids += pageObjects[p] + " 0 R ";
				}
				console.log(kids);
				kids = kids.replace(/^\s+|\s+$/g,'');
				pdfScript +=
				"/Kids ["+kids+"]\r\n" +
				"/Count "+pageCount+"\r\n" +
				">>\r\n" +
				"endobj\r\n";
			}

		}
		//fonts
		objectNum++;
		fontObjectNum = objectNum;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Helvetica/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Helvetica-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Helvetica-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Helvetica-BoldOblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Courier-Oblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Courier-BoldOblique/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Times-Roman/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Times-Bold/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Times-Italic/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<</BaseFont/Times-BoldItalic/Type/Font\r\n" +
		"/Encoding/WinAnsiEncoding\r\n" +
		"/Subtype/Type1>>\r\n" +
		"endobj\r\n";
		//end fonts

		//add image raw data


		for (var i = 0; i < elements.length; i++) {
			tagName = elements[i].tagName;
			if(tagName === "IMG"){
				var img = elements[i];
				var canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height =  img.height;
				var context = canvas.getContext('2d');
				context.drawImage(img, 0, 0 );

				objectNum++;
				pdfScript +=
				objectNum + " 0 obj\r\n" +
				"<</Type /XObject\r\n" +
				"/Subtype /Image\r\n" +
				"/Width "+canvas.width+"\r\n" +
				"/Height "+canvas.height+"\r\n" +
				"/ColorSpace /DeviceRGB\r\n" +
				"/BitsPerComponent 8\r\n" +
				"/Filter /DCTDecode\r\n";

				function b64_to_utf8( str ) {
				    str = str.replace(/\s/g, '');
				    return decodeURIComponent(encodeURIComponent(window.atob(str)));
				}

				var dataURL = canvas.toDataURL("image/jpeg", 1.0).replace("data:image/jpeg;base64,","");
				var utf8ImgData = b64_to_utf8(dataURL);

				pdfScript +=
				"/Length 30994>>\r\n" +
				"stream\r\n" +
				utf8ImgData + "\r\n" +
				"endstream\r\n"
				;
			}
		}



		pdfScript +=
		"2 0 obj\r\n" + //object 2
		"<<\r\n" +
		"/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]\r\n" +
		"/Font <<\r\n" +
		"/F1 "+fontObjectNum+" 0 R\r\n" +
		"/F2 "+(fontObjectNum + 1)+" 0 R\r\n" +
		"/F3 "+(fontObjectNum + 2)+" 0 R\r\n" +
		"/F4 "+(fontObjectNum + 3)+" 0 R\r\n" +
		"/F5 "+(fontObjectNum + 4)+" 0 R\r\n" +
		"/F6 "+(fontObjectNum + 5)+" 0 R\r\n" +
		"/F7 "+(fontObjectNum + 6)+" 0 R\r\n" +
		"/F8 "+(fontObjectNum + 7)+" 0 R\r\n" +
		"/F9 "+(fontObjectNum + 8)+" 0 R\r\n" +
		"/F10 "+(fontObjectNum + 9)+" 0 R\r\n" +
		">>\r\n" +
		"/XObject <<\r\n";
		if(imgCount > 0){
			pdfScript += "/I0 17 0 R\r\n";
		}
		pdfScript +=
		">>\r\n" +
		">>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
		"<<\r\n" +
		"/Producer (pdfGen jamesjenkins)\r\n" +
		"/CreationDate (D:"+creationDate+")\r\n" +
		">>\r\n" +
		"endobj\r\n";
		objectNum++;
		pdfScript +=
		objectNum + " 0 obj\r\n" +
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
		"0000000317 00000 n\r\n" +
		"0000032678 00000 n\r\n" +
		"0000000009 00000 n\r\n" +
		"0000000118 00000 n\r\n" +
		"0000000374 00000 n\r\n" +
		"0000000464 00000 n\r\n" +
		"0000000559 00000 n\r\n" +
		"0000000657 00000 n\r\n" +
		"0000000759 00000 n\r\n" +
		"0000000847 00000 n\r\n" +
		"0000000941 00000 n\r\n" +
		"0000001038 00000 n\r\n" +
		"0000001139 00000 n\r\n" +
		"0000001232 00000 n\r\n" +
		"0000001324 00000 n\r\n" +
		"0000001418 00000 n\r\n" +
		"0000001516 00000 n\r\n" +
		"0000032913 00000 n\r\n" +
		"0000033032 00000 n\r\n" +
		"trailer\r\n" +
		"<<\r\n" +
		"/Size 21\r\n" +
		"/Root "+objectNum+" 0 R\r\n" +
		"/Info 17 0 R\r\n" +
		">>\r\n" +
		"startxref\r\n" +
		"33136\r\n";
		// pdf end of file
		pdfScript += "%%EOF";
		//console.log(pdfScript);
		pdfData += btoa(pdfScript);
		localStorage.setItem('pdfbase64', pdfData);
		window.open(pdfData,"_blank");
};
