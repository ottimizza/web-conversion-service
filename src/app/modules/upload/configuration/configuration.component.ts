import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConversionService } from '@app//http/conversion.service';
import { PDFConverterConfig, IPDFConverterConfig } from '@shared/models/PDFConverterConfig';


@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

    public config: IPDFConverterConfig;

    public strategies: any;

    constructor() {
    }

    public strategy(event: any) {
        this.strategies.selected = this.strategies.options.filter((e) => e.value === event.target.value)[0];
        this.config.strategy = event.target.value;
        return this.store();
    }

    public delimiter(delimiter: string) {
        this.config.delimiter = delimiter;
        return this.store();
    }

    public pages(pages: string) {
        this.config.pages = pages;
        return this.store();
    }

    public export() {
        return;
    }

    private store(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            window.localStorage.setItem("config", JSON.stringify(this.config));
            resolve(window.localStorage.getItem("config"));
        });
    }

    public ngOnInit() {
        this.config = {
            delimiter: "|",
            pages: "[0,1,2-5]",
            strategy: "LTTextLine",
            shrink: false,
            trim: true
        }

        this.strategies = {
            options: new Array<any>(
                {
                    name: 'LTTextLine',
                    value: 'LTTextLine',
                    description: 'Estratégia padrão de conversão de PDFs. Cada quebra de linha dentro das caixas de texto, são convertidas em novas linhas no CSV final.'
                },
                {
                    name: 'LTTextBoxUC',
                    value: 'LTTextBoxUC',
                    description: 'Estratégia de conversão onde são considerados Caixas de Texto. Cada caixa de texto pode conter mais de uma linha.'
                },
                {
                    name: 'LTTextBoxMC',
                    value: 'LTTextBoxMC',
                    description: 'Estratégia de conversão onde são considerados Caixas de Texto, mas diferente da Estratégia 2, cada quebra de linha ocupa uma coluna nova na mesma linha.'
                }
            ),
            selected: {
                name: 'LTTextLine',
                value: 'LTTextLine',
                description: 'LTTextLine'
            }
        };


        let storedConfig = JSON.parse(window.localStorage.getItem("config"));

        if (storedConfig && storedConfig.strategy) {
            this.config = storedConfig;
            this.strategy({ target: { value: this.config.strategy } });
        }

    }

}
