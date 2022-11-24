// (C) 2007-2022 GoodData Corporation
import { ScreenSize } from "@gooddata/sdk-model";
import flatMap from "lodash/flatMap";
import React from "react";
import { RenderMode } from "../../../types";
import { IDashboardLayoutSectionFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces";
import {
    useDashboardSelector,
    selectIsInEditMode,
    useDashboardDispatch,
    selectWidgetsOverlayState,
    selectSectionModification,
    uiActions,
} from "../../../model";
import { DashboardItemOverlay } from "../DashboardItemOverlay/DashboardItemOverlay";
import { DashboardLayoutGridRow } from "./DashboardLayoutGridRow";
import { DashboardLayoutSectionHeaderRenderer } from "./DashboardLayoutSectionHeaderRenderer";
import { DashboardLayoutSectionRenderer } from "./DashboardLayoutSectionRenderer";
import {
    IDashboardLayoutGridRowRenderer,
    IDashboardLayoutItemKeyGetter,
    IDashboardLayoutItemRenderer,
    IDashboardLayoutSectionHeaderRenderer,
    IDashboardLayoutSectionKeyGetter,
    IDashboardLayoutSectionRenderer,
    IDashboardLayoutWidgetRenderer,
} from "./interfaces";
import { getRefsForSection } from "../refs";

/**
 * @alpha
 */
export interface IDashboardLayoutSectionProps<TWidget> {
    section: IDashboardLayoutSectionFacade<TWidget>;
    sectionKeyGetter?: IDashboardLayoutSectionKeyGetter<TWidget>;
    sectionRenderer?: IDashboardLayoutSectionRenderer<TWidget>;
    sectionHeaderRenderer?: IDashboardLayoutSectionHeaderRenderer<TWidget>;
    itemKeyGetter?: IDashboardLayoutItemKeyGetter<TWidget>;
    itemRenderer?: IDashboardLayoutItemRenderer<TWidget>;
    widgetRenderer: IDashboardLayoutWidgetRenderer<TWidget>;
    gridRowRenderer?: IDashboardLayoutGridRowRenderer<TWidget>;
    getLayoutDimensions: () => DOMRect;
    screen: ScreenSize;
    renderMode: RenderMode;
}

const defaultSectionRenderer: IDashboardLayoutSectionRenderer<unknown> = (props) => (
    <DashboardLayoutSectionRenderer {...props} />
);

const defaultHeaderRenderer: IDashboardLayoutSectionHeaderRenderer<unknown> = (props) => (
    <DashboardLayoutSectionHeaderRenderer {...props} />
);

const defaultItemKeyGetter: IDashboardLayoutItemKeyGetter<unknown> = ({ item }) => item.index().toString();

export function DashboardLayoutSection<TWidget>(props: IDashboardLayoutSectionProps<TWidget>): JSX.Element {
    const {
        section,
        sectionRenderer = defaultSectionRenderer,
        sectionHeaderRenderer = defaultHeaderRenderer,
        itemKeyGetter = defaultItemKeyGetter,
        gridRowRenderer,
        itemRenderer,
        widgetRenderer,
        getLayoutDimensions,
        screen,
        renderMode,
    } = props;
    const renderProps = { section, screen, renderMode };

    const dispatch = useDashboardDispatch();
    const isInEditMode = useDashboardSelector(selectIsInEditMode);

    const refs = getRefsForSection(section);
    const overlayShow = useDashboardSelector(selectWidgetsOverlayState(refs));
    const sectionModifications = useDashboardSelector(selectSectionModification(refs));

    const items = flatMap(section.items().asGridRows(screen), (itemsInRow, index) => {
        return (
            <DashboardLayoutGridRow
                key={index.toString()}
                screen={screen}
                section={section}
                items={itemsInRow}
                gridRowRenderer={gridRowRenderer}
                itemKeyGetter={itemKeyGetter}
                itemRenderer={itemRenderer}
                widgetRenderer={widgetRenderer}
                renderMode={renderMode}
                getLayoutDimensions={getLayoutDimensions}
            />
        );
    });

    return sectionRenderer({
        ...renderProps,
        DefaultSectionRenderer: DashboardLayoutSectionRenderer,
        children: (
            <>
                {sectionHeaderRenderer({
                    section,
                    screen,
                    DefaultSectionHeaderRenderer: DashboardLayoutSectionHeaderRenderer,
                })}
                {items}
                <DashboardItemOverlay
                    type="column"
                    onHide={() =>
                        dispatch(
                            uiActions.toggleWidgetsOverlay({
                                visible: false,
                                refs: section.items().map((item) => item.ref()),
                            }),
                        )
                    }
                    render={Boolean(isInEditMode && overlayShow)}
                    modifications={sectionModifications}
                />
            </>
        ),
    });
}
