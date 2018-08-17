/*
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
import { DragEvent, MouseEvent } from "react";
import { classNames } from "../../utils/dom/dom";
import { HighlightString } from "../highlight-string/highlight-string";
import { InfoBubble } from "../info-bubble/info-bubble";
import { SvgIcon } from "../svg-icon/svg-icon";
import "./dimension-item.scss";

export const DIMENSION_CLASS_NAME = "dimension";

export interface DimensionItemProps {
  name: string;
  title: string;
  description?: string;
  classSuffix: string;
  dimensionClick: DimensionClickHandler;
  dimensionDragStart: DimensionDragStartHandler;
  searchText: string;
  selected: boolean;
}

export type DimensionClickHandler = (dimensionName: string, e: MouseEvent<HTMLElement>) => void;
export type DimensionDragStartHandler = (dimensionName: string, e: DragEvent<HTMLElement>) => void;

export const DimensionItem: React.SFC<DimensionItemProps> = ({ name, title, dimensionClick, dimensionDragStart, description, classSuffix, searchText, selected }) => {
  const infoBubbleClassName = "info-icon";
  const className = classNames(DIMENSION_CLASS_NAME, "type-" + classSuffix, { selected });

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as Element;
    if (target.classList && target.classList.contains(infoBubbleClassName)) return;
    dimensionClick(name, e);
  };

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    dimensionDragStart(name, e);
  };

  return <div
    className={className}
    key={name}
    onClick={handleClick}
    draggable={true}
    onDragStart={handleDragStart}
  >
    <div className="icon">
      <SvgIcon svg={require("../../icons/dim-" + classSuffix + ".svg")}/>
    </div>
    <HighlightString className={classNames("label")} text={title} highlight={searchText}/>
    {description && <InfoBubble className={infoBubbleClassName} description={description}/>}
  </div>;
};
