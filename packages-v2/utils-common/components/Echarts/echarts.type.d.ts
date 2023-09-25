import {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  MarkPointComponentOption,
  MarkLineComponentOption,
  MarkAreaComponentOption,
  DatasetComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
} from 'echarts/components';

import { BarSeriesOption, PieSeriesOption, LineSeriesOption } from 'echarts/charts';

import { XAXisComponentOption, YAXisComponentOption, ComposeOption } from 'echarts';

/**
 * tool interface
 */
type BaseTool =
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
  | TooltipComponentOption
  | TitleComponentOption
  | LegendComponentOption
  | XAXisComponentOption
  | YAXisComponentOption;

type ToolOption = ComposeOption<BaseTool>;

type InitOptions = {
  devicePixelRatio?: number;
  renderer?: string;
  width?: number | string;
  height?: number | string;
  locale?: string;
};

/**
 * component interface
 */
type BarCompleteOption = ComposeOption<BaseTool | BarSeriesOption>;

type PieCompleteOption = ComposeOption<BaseTool | PieSeriesOption>;

type LineCompleteOption = ComposeOption<BaseTool | LineSeriesOption>;

export { InitOptions, BaseTool, ToolOption, BarCompleteOption, BarSeriesOption, PieCompleteOption, PieSeriesOption, LineCompleteOption, LineSeriesOption };
