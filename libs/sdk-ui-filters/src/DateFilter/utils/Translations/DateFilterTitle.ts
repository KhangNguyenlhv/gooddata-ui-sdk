// (C) 2019-2021 GoodData Corporation
import format from "date-fns/format";
import capitalize from "lodash/capitalize";
import isEqual from "lodash/isEqual";
import { ILocale, getIntl } from "@gooddata/sdk-ui";
import { granularityIntlCodes } from "../../constants/i18n";
import { IMessageTranslator, IDateAndMessageTranslator } from "./Translators";
import { convertPlatformDateStringToDate } from "../DateConversions";
import {
    DateFilterGranularity,
    IAbsoluteDateFilterPreset,
    IRelativeDateFilterPreset,
    isAbsoluteDateFilterForm,
    isRelativeDateFilterForm,
    isAllTimeDateFilterOption,
    isAbsoluteDateFilterPreset,
    isRelativeDateFilterPreset,
} from "@gooddata/sdk-backend-spi";
import { IUiAbsoluteDateFilterForm, IUiRelativeDateFilterForm, DateFilterOption } from "../../interfaces";
import { DEFAULT_DATE_FORMAT } from "../../constants/Platform";

export const formatAbsoluteDate = (date: Date, dateFormat: string): string => format(date, dateFormat);

export const formatAbsoluteDateRange = (
    from: Date | string,
    to: Date | string,
    dateFormat: string,
): string => {
    const fromDate = convertPlatformDateStringToDate(from);
    const toDate = convertPlatformDateStringToDate(to);
    const fromTitle = formatAbsoluteDate(fromDate, dateFormat);
    const toTitle = formatAbsoluteDate(toDate, dateFormat);

    if (isEqual(fromTitle, toTitle)) {
        return fromTitle;
    }

    return `${fromTitle}\u2013${toTitle}`;
};

const relativeDateRangeFormatters: Array<{
    predicate: (from: number, to: number) => boolean;
    formatter: (
        from: number,
        to: number,
        intlGranularity: string,
        translator: IDateAndMessageTranslator,
    ) => string;
}> = [
    {
        // Today, This month
        predicate: (from, to) => from === 0 && to === 0,
        formatter: (_from, _to, intlGranularity, translator) =>
            translator.formatMessage({ id: `filters.this${capitalize(intlGranularity)}.title` }),
    },
    {
        // Tomorrow, Next month
        predicate: (from, to) => from === 1 && to === 1,
        formatter: (_from, _to, intlGranularity, translator) =>
            translator.formatMessage({ id: `filters.next${capitalize(intlGranularity)}.title` }),
    },
    {
        // Yesterday, Last month
        predicate: (from, to) => from === -1 && to === -1,
        formatter: (_from, _to, intlGranularity, translator) =>
            translator.formatMessage({ id: `filters.last${capitalize(intlGranularity)}.title` }),
    },
    {
        // Next N days (months)
        predicate: (from) => from === 0,
        formatter: (_from, to, intlGranularity, translator) =>
            translator.formatMessage(
                { id: `filters.nextN${capitalize(intlGranularity)}s` },
                { n: Math.abs(to) + 1 },
            ),
    },
    {
        // Last N days (months)
        predicate: (_from, to) => to === 0,
        formatter: (from, _to, intlGranularity, translator) =>
            translator.formatMessage(
                { id: `filters.lastN${capitalize(intlGranularity)}s` },
                { n: Math.abs(from) + 1 },
            ),
    },
    {
        // From N days ago to M days ago
        predicate: (from, to) => from < 0 && to < 0,
        formatter: (from, to, intlGranularity, translator) =>
            translator.formatMessage(
                { id: `filters.interval.${intlGranularity}s.past` },
                {
                    from: Math.abs(from),
                    to: Math.abs(to),
                },
            ),
    },
    {
        // From N days ahead to M days ahead
        predicate: (from, to) => from > 0 && to > 0,
        formatter: (from, to, intlGranularity, translator) =>
            translator.formatMessage(
                { id: `filters.interval.${intlGranularity}s.future` },
                {
                    from: Math.abs(from),
                    to: Math.abs(to),
                },
            ),
    },
    {
        // From N days ago to M days ahead
        predicate: () => true,
        formatter: (from, to, intlGranularity, translator) =>
            translator.formatMessage(
                { id: `filters.interval.${intlGranularity}s.mixed` },
                {
                    from: Math.abs(from),
                    to: Math.abs(to),
                },
            ),
    },
];

export const formatRelativeDateRange = (
    from: number,
    to: number,
    granularity: DateFilterGranularity,
    translator: IDateAndMessageTranslator,
): string => {
    const intlGranularity = granularityIntlCodes[granularity];
    const { formatter } = relativeDateRangeFormatters.find((f) => f.predicate(from, to));
    return formatter(from, to, intlGranularity, translator);
};

const getAllTimeFilterRepresentation = (translator: IMessageTranslator): string =>
    translator.formatMessage({ id: "filters.allTime.title" });

const getAbsoluteFormFilterRepresentation = (filter: IUiAbsoluteDateFilterForm, dateFormat: string): string =>
    filter.from && filter.to ? formatAbsoluteDateRange(filter.from, filter.to, dateFormat) : "";

const getAbsolutePresetFilterRepresentation = (
    filter: IAbsoluteDateFilterPreset,
    dateFormat: string,
): string => formatAbsoluteDateRange(filter.from, filter.to, dateFormat);

const getRelativeFormFilterRepresentation = (
    filter: IUiRelativeDateFilterForm,
    translator: IDateAndMessageTranslator,
): string =>
    typeof filter.from === "number" && typeof filter.to === "number"
        ? formatRelativeDateRange(filter.from, filter.to, filter.granularity, translator)
        : "";

const getRelativePresetFilterRepresentation = (
    filter: IRelativeDateFilterPreset,
    translator: IDateAndMessageTranslator,
): string => formatRelativeDateRange(filter.from, filter.to, filter.granularity, translator);

const getDateFilterRepresentationByFilterType = (
    filter: DateFilterOption,
    translator: IDateAndMessageTranslator,
    dateFormat: string,
) => {
    if (isAbsoluteDateFilterForm(filter) || isRelativeDateFilterForm(filter)) {
        return getDateFilterRepresentationUsingTranslator(filter, translator, dateFormat);
    } else if (
        isAllTimeDateFilterOption(filter) ||
        isAbsoluteDateFilterPreset(filter) ||
        isRelativeDateFilterPreset(filter)
    ) {
        return filter.name || getDateFilterRepresentationUsingTranslator(filter, translator, dateFormat);
    } else {
        throw new Error("Unknown DateFilterOption type");
    }
};

// excludeCurrentPeriod is extra metadata that is needed by translation, but it is only used by relative filters
// so the data structure is little inconsistent - for example when we translate absoluteForm we need to pass
// excludeCurrentPeriod that is completely unrelated to absolute filter and is not used in absolute translations.
// So in the future, if there will be need for more metadata, consider adding wrapper union type that would wrap
// DateFilterOption along with additional metadata related to given filter. eg.:
// | { filter: IRelativeDateFilterPreset, excludeCurrentPeriod: boolean } |
// | { filter: IAbsoluteFilterForm } |
// ...
/**
 * Gets the filter title favoring custom name if specified.
 * @returns {string} Representation of the filter (e.g. "My preset", "From 2 weeks ago to 1 week ahead")
 */
export const getDateFilterTitle = (
    filter: DateFilterOption,
    locale: ILocale,
    dateFormat: string = DEFAULT_DATE_FORMAT,
): string => {
    const translator = getIntl(locale);

    return getDateFilterRepresentationByFilterType(filter, translator, dateFormat);
};

/**
 * Gets the filter title favoring custom name if specified. This function is only for mock purpose.
 * @returns {string} Representation of the filter (e.g. "My preset", "From 2 weeks ago to 1 week ahead")
 */
export const getDateFilterTitleUsingTranslator = (
    filter: DateFilterOption,
    translator: IDateAndMessageTranslator,
    dateFormat: string = DEFAULT_DATE_FORMAT,
): string => getDateFilterRepresentationByFilterType(filter, translator, dateFormat);

/**
 * Gets the filter representation regardless of custom name.
 * @returns {string} Representation of the filter (e.g. "From 2 weeks ago to 1 week ahead")
 */
const getDateFilterRepresentationUsingTranslator = (
    filter: DateFilterOption,
    translator: IDateAndMessageTranslator,
    dateFormat: string,
): string => {
    if (isAbsoluteDateFilterForm(filter)) {
        return getAbsoluteFormFilterRepresentation(filter, dateFormat);
    } else if (isAbsoluteDateFilterPreset(filter)) {
        return getAbsolutePresetFilterRepresentation(filter, dateFormat);
    } else if (isAllTimeDateFilterOption(filter)) {
        return getAllTimeFilterRepresentation(translator);
    } else if (isRelativeDateFilterForm(filter)) {
        return getRelativeFormFilterRepresentation(filter, translator);
    } else if (isRelativeDateFilterPreset(filter)) {
        return getRelativePresetFilterRepresentation(filter, translator);
    } else {
        throw new Error("Unknown DateFilterOption type");
    }
};

export const getDateFilterRepresentation = (
    filter: DateFilterOption,
    locale: ILocale,
    dateFormat: string = DEFAULT_DATE_FORMAT,
): string => {
    const translator = getIntl(locale);

    return getDateFilterRepresentationUsingTranslator(filter, translator, dateFormat);
};
