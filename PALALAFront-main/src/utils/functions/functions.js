import jsPDF from "jspdf";
// import { PDFDocument, rgb } from 'pdf-lib';

/*
const fillDocx = () => {
  const Docxtemplater = require("docxtemplater");
  const PizZip = require("pizzip");

  const path = require("path");
  // Load the template

  const content = fs.readFileSync(
    path.resolve(__dirname, "res.docx"),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    a: "John",
    b: "Doe",
    c: "0652455478",
    d: "New Website",
  });

  // Get the zip document and generate it as a nodebuffer
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
};

const convertDocxToPdf = (inputPath, outputPath) => {
  const docx = officegen("docx");
  const pdfDoc = new PDFDocument();

  // Read the .docx file
  const content = fs.readFileSync(inputPath, "binary");

  // Load .docx content into officegen
  docx.load(content);

  // Pipe the generated .docx content to a writable stream
  const writer = fs.createWriteStream(outputPath);
  docx.generate(writer);

  // End the writer to finalize the .docx file
  writer.on("finish", () => {
    // Now, convert the .docx file to PDF
    const pdfWriter = fs.createWriteStream(outputPath.replace(".docx", ".pdf"));
    pdfDoc.pipe(pdfWriter);
    pdfDoc.text("Converted PDF content from .docx");
    pdfDoc.end();
  });
};

export default convertDocxToPdf;

 */
export const convertBlobToPDF = async (blob, filename) => {
  const blobToDataURL = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // Create a new instance of jsPDF
  const pdf = new jsPDF("l", "cm", [29.7, 21]);

  // Convert the blob to a data URL
  const dataUrl = await blobToDataURL(blob);

  // Add the image to the PDF
  pdf.addImage(dataUrl, "PNG", 0, 0, 29.7, 21);

  // Save or download the PDF
  return pdf.output("blob");
};

/* export const embedTableToDoc = async (values,globalValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Cargar el PDF existente
      const url = 'plantillares.pdf';
      const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

      // Crear un nuevo documento PDF
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Obtener la primera página del PDF
      const page = pdfDoc.getPage(0);

      // Agregar texto a la página
      const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
      const textSize = 30;
      const text = 'Texto agregado con pdf-lib';
      page.drawText(text, { x: 50, y: 50, font, size: textSize, color: rgb(0, 0, 0) });

      // Obtener los bytes del nuevo PDF modificado
      const modifiedPdfBytes = await pdfDoc.save();

      // Hacer algo con los bytes del PDF modificado, como descargarlo
      // ...

      console.log('PDF modificado creado con éxito.');
      resolve(modifiedPdfBytes);
    } catch (error) {
      console.error('Error al agregar texto al PDF:', error);
      reject(error);
    }
  });
}; */
