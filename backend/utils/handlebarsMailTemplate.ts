import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

export async function parse({
  file,
  variables,
}: IParseMailTemplateDTO): Promise<string> {
  const templateFileContent = await fs.promises.readFile(file, {
    encoding: 'utf-8',
  });
  const parseTemplate = handlebars.compile(templateFileContent);

  return parseTemplate(variables);
}
