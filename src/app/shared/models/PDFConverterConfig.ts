export interface IPDFConverterConfig {

    delimiter: string;

    strategy: string;

    pages: string;

    trim: boolean;

    shrink: boolean;

    laparams?: any;

}

export class PDFConverterConfig {

    delimiter: string;

    strategy: string;

    pages: string;

    trim: boolean;

    shrink: boolean;

    laparams?: any;

}