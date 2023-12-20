import html2pdf from 'html2pdf.js'


export default function generatePDF(content:string) {
  const opt = {
    margin: 0.5, 
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } 
  };
  
  html2pdf().set(opt).from(content).save();
}
