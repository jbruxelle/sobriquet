import { readFile, writeFile } from 'node:fs/promises';
import {
  LanguageConfigurationAdapter,
  LanguageConfigurationAdapterOptions,
} from '../../sobriquet/gateways/language-configuration.adapter';

export class FakeConfigurationAdapter implements LanguageConfigurationAdapter {
  private readonly _name: string = 'fake';
  private readonly _configFileName: string = 'fakeconfig.json';

  constructor(
    private readonly _options?: LanguageConfigurationAdapterOptions
  ) {}

  get name(): string {
    return this._name;
  }

  get configFileName(): string {
    return this._configFileName;
  }

  get defaultSource(): string {
    return `./${this._configFileName}`;
  }

  get source(): string {
    return this._options?.source ?? this.defaultSource;
  }

  get output(): string {
    return this._options?.output ?? this.defaultSource;
  }

  async resolve(
    which: 'source' | 'ouput' = 'source'
  ): Promise<Record<string, any>> {
    const configurationBuffer = await readFile(
      which === 'source' ? this.source : this.output
    );

    const configurationString = configurationBuffer.toString();
    const configuration = JSON.parse(configurationString);

    return configuration;
  }

  async consume(computedPaths: Record<string, string>): Promise<void> {
    const configuration = await this.resolve();
    const paths = configuration.paths;

    const updatedConfiguration = {
      ...configuration,
      paths: { ...paths, ...computedPaths },
    };

    await writeFile(this.output, JSON.stringify(updatedConfiguration));
  }
}
