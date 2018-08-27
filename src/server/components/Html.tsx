import * as React from 'react';
import * as serialize from 'serialize-javascript';
import { Store } from 'redux';

type TChunks = {
  javascript: StringObj;
  styles: StringObj;
};

interface IHtmlProps {
  assets: TChunks;
  content: string;
  css: string;
  emotionIds: string[];
  store: Store<IRootState>;
}

class Html extends React.Component<IHtmlProps> {
  public render() {
    const { content, css, emotionIds, store } = this.props;
    return (
      <html lang="ru">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script
          id="emotionCritical"
          dangerouslySetInnerHTML={{
            __html: `window.__EMOTION_CRITICAL_IDS__ = ${serialize(
              emotionIds,
            )}`,
          }}
        />
        <script
          id="serverState"
          dangerouslySetInnerHTML={{
            __html: `window.__REDUX_INITIAL_STATE__ = ${serialize(
              store.getState(),
            )}`,
          }}
        />
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
