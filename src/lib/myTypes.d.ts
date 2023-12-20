declare module "html2pdf.js" {
    type opt =  {
        margin: number;
        filename: string;
        image: {
            type: string;
            quality: number;
        };
        html2canvas: {
            scale: number;
        };
        jsPDF: {
            unit: string;
            format: string;
            orientation: string;
        };
    }
    
    interface Html2Pdf {
      set(opt: opt): Html2Pdf;
      from(content: string | HTMLElement): Html2Pdf;
      save(): void;
    }
  
    function html2pdf(): Html2Pdf;
  
    export = html2pdf;
  }