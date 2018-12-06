import * as React from 'react';
import * as serialize from 'serialize-javascript';
import { Store } from 'redux';
import { HelmetData } from 'react-helmet';

type TChunks = {
  javascript: StringObj;
  styles: StringObj;
};

export type TPreloaded = {
  id: string;
  file: string;
  name: string;
  publicPath: string;
};

interface IHtmlProps {
  assets: TChunks;
  content: string;
  css: string;
  emotionIds: string[];
  helmet: HelmetData;
  store: Store<IRootState>;
  preloaded: TPreloaded[];
}

class Html extends React.Component<IHtmlProps> {
  public render() {
    const { content, css, emotionIds, store, helmet } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html lang="en" {...htmlAttrs}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}

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
        </head>
        <body {...bodyAttrs}>
          <div
            id={global.boil.appId}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {this.preloadedChunks}
          {this.jsChunks}
        </body>
      </html>
    );
  }

  private get preloadedChunks() {
    const { preloaded } = this.props;
    const jsChunks = [];
    for (const chunk in preloaded) {
      if (preloaded.hasOwnProperty(chunk)) {
        const ignoreLocale = new RegExp(/.map$/);
        if (!ignoreLocale.test(preloaded[chunk].publicPath)) {
          jsChunks.push(
            <script
              key={chunk}
              src={preloaded[chunk].publicPath}
              charSet="UTF-8"
            />,
          );
        }
      }
    }
    return jsChunks;
  }

  private get jsChunks() {
    const { assets } = this.props;
    const jsChunks = [];
    for (const chunk in assets.javascript) {
      if (assets.javascript.hasOwnProperty(chunk)) {
        const ignoreLocale = new RegExp(/^locale/);
        if (!ignoreLocale.test(chunk)) {
          jsChunks.push(
            <script
              key={chunk}
              src={assets.javascript[chunk]}
              charSet="UTF-8"
            />,
          );
        }
      }
    }
    return jsChunks;
  }
}

export default Html;
export { TChunks, IHtmlProps };
