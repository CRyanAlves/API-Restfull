import fs from 'fs';
import Handlebars, { template } from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
