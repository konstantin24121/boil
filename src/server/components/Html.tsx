import * as React from 'react';

type TChunks = {
  javascript: StringObj;
  styles: StringObj;
};

interface IHtmlProps {
  assets: TChunks;
  content: string;
}

class Html extends React.Component<IHtmlProps> {
  public render() {
    const { content } = this.props;
    return (
      <html lang="ru">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div
            id={global.boil.appId}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {this.jsChunks}
        </body>
      </html>
    );
  }

  private get jsChunks() {
    const { assets } = this.props;
    const jsChunks = [];
    for (const chunk in assets.javascript) {
      jsChunks.push(
        <script key={chunk} src={assets.javascript[chunk]} charSet="UTF-8" />,
      );
    }
    return jsChunks;
  }
}

export default Html;
export { TChunks, IHtmlProps };
