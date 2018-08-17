/*
 * Copyright 2015-2016 Imply Data, Inc.
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Clicker, Dimension, Essence, SplitCombine, Stage, VisStrategy } from "../../../common/models";
import { Fn } from "../../../common/utils/general/general";
import { STRINGS } from "../../config/constants";
import { BubbleMenu, Direction } from "../bubble-menu/bubble-menu";
import { SvgIcon } from "../svg-icon/svg-icon";
import "./dimension-actions-menu.scss";

const ACTION_SIZE = 60;

export interface DimensionActionsMenuProps {
  clicker: Clicker;
  essence: Essence;
  direction: Direction;
  containerStage: Stage;
  openOn: Element;
  dimension: Dimension;
  triggerFilterMenu: (dimension: Dimension) => void;
  triggerSplitMenu: (dimension: Dimension) => void;
  onClose: Fn;
}

export interface DimensionActionsMenuState {
}

export class DimensionActionsMenu extends React.Component<DimensionActionsMenuProps, DimensionActionsMenuState> {

  onFilter(): void {
    var { dimension, triggerFilterMenu, onClose } = this.props;
    triggerFilterMenu(dimension);
    onClose();
  }

  onSplit(): void {
    var { clicker, essence, dimension, triggerSplitMenu, onClose } = this.props;
    if (essence.splits.hasSplitOn(dimension) && essence.splits.length() === 1) {
      triggerSplitMenu(dimension);
    } else {
      clicker.changeSplit(SplitCombine.fromExpression(dimension.expression), VisStrategy.FairGame);
    }
    onClose();
  }

  onSubsplit(): void {
    var { clicker, essence, dimension, triggerSplitMenu, onClose } = this.props;
    if (essence.splits.hasSplitOn(dimension)) {
      triggerSplitMenu(dimension);
    } else {
      clicker.addSplit(SplitCombine.fromExpression(dimension.expression), VisStrategy.FairGame);
    }
    onClose();
  }

  onPin(): void {
    var { clicker, dimension, onClose } = this.props;
    clicker.pin(dimension);
    onClose();
  }

  render() {
    var { direction, containerStage, openOn, dimension, onClose } = this.props;
    if (!dimension) return null;

    var menuSize: Stage = Stage.fromSize(ACTION_SIZE * 2, ACTION_SIZE * 2);
    return <BubbleMenu
      className="dimension-actions-menu"
      direction={direction}
      containerStage={containerStage}
      stage={menuSize}
      fixedSize={true}
      openOn={openOn}
      onClose={onClose}
    >
      <div className="filter action" onClick={this.onFilter.bind(this)}>
        <SvgIcon svg={require("../../icons/preview-filter.svg")} />
        <div className="action-label">{STRINGS.filter}</div>
      </div>
      <div className="pin action" onClick={this.onPin.bind(this)}>
        <SvgIcon svg={require("../../icons/preview-pin.svg")} />
        <div className="action-label">{STRINGS.pin}</div>
      </div>
      <div className="split action" onClick={this.onSplit.bind(this)}>
        <SvgIcon svg={require("../../icons/preview-split.svg")} />
        <div className="action-label">{STRINGS.split}</div>
      </div>
      <div className="subsplit action" onClick={this.onSubsplit.bind(this)}>
        <SvgIcon svg={require("../../icons/preview-subsplit.svg")} />
        <div className="action-label">{STRINGS.subsplit}</div>
      </div>
    </BubbleMenu>;
  }
}
