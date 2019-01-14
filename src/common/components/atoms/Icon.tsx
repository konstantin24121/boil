import * as React from 'react';
import styled from '@emotion/styled';
import { icons, EIconNames } from 'icons/IconsManifest';
import { css } from '@emotion/core';

export interface IIconProps extends React.HTMLAttributes<SVGElement> {
  name: EIconNames;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  rotate?: number;
}

export class Icon extends React.Component<IIconProps, {}> {
  public static defaultProps = {
    width: '1em',
    height: 'auto',
    color: 'currentColor',
    rotate: 0,
  };
  public render() {
    const { name, width, height, color, className, rotate } = this.props;
    const SvgIcon = icons[name].default;
    return (
      <IconStyler
        width={width}
        height={height}
        color={color}
        className={className}
        rotate={rotate}
      >
        <SvgIcon width="100%" height="100%" />
      </IconStyler>
    );
  }
}

interface IIconStyledProps
  extends Pick<IIconProps, 'width' | 'height' | 'color' | 'rotate'> {}

const IconStyler = styled('span')<IIconStyledProps>(
  ({ width, height, color, rotate }) => css`
    display: inline-block;
    line-height: 0;
    flex-shrink: 0;
    width: ${width};
    height: ${height};
    transform: rotate(${rotate}deg);
    color: ${color};
    fill: ${color};
  `,
);
