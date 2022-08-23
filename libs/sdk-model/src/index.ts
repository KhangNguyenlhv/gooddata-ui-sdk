// (C) 2019-2022 GoodData Corporation
/**
 * This package provides domain models for GoodData.UI.
 *
 * @remarks
 * These domain models are backend-agnostic. This makes them reusable across different Analytical Backend implementations.
 * The package includes TypeScript type definitions, factory functions, functions to get or set certain
 * properties of the objects in an immutable way, and more.
 * These are used in both the `@gooddata/sdk-backend-*` and `@gooddata/sdk-ui*` packages.
 *
 * @packageDocumentation
 */
export { DateAttributeGranularity, DateGranularity, AllTimeGranularity } from "./base/dateGranularities";
export { IAuditable, IAuditableDates, IAuditableUsers } from "./base/metadata";
export { ComparatorDirection, IComparator } from "./base/comparators";

export {
    IAttribute,
    IAttributeBody,
    isAttribute,
    attributeLocalId,
    AttributePredicate,
    anyAttribute,
    idMatchAttribute,
    attributesFind,
    attributeUri,
    attributeIdentifier,
    attributeAlias,
    attributeDisplayFormRef,
} from "./execution/attribute";

export {
    newAttribute,
    modifyAttribute,
    AttributeBuilder,
    AttributeModifications,
    AttributeBuilderInput,
} from "./execution/attribute/factory";

export {
    ObjectType,
    Identifier,
    Uri,
    UriRef,
    IdentifierRef,
    LocalIdRef,
    ObjRef,
    ObjRefInScope,
    isUriRef,
    isIdentifierRef,
    objRefToString,
    isLocalIdRef,
    areObjRefsEqual,
    isObjRef,
    serializeObjRef,
    deserializeObjRef,
} from "./objRef";

export {
    IDimension,
    isDimension,
    dimensionTotals,
    DimensionItem,
    newTwoDimensional,
    newDimension,
    MeasureGroupIdentifier,
    dimensionSetTotals,
    dimensionsFindItem,
    ItemInDimension,
} from "./execution/base/dimension";

export { idRef, uriRef, localIdRef } from "./objRef/factory";

export { TotalType, ITotal, isTotal, newTotal, totalIsNative } from "./execution/base/totals";

export {
    SortDirection,
    ISortDirection,
    IAttributeSortItem,
    IAttributeSortTarget,
    IAttributeSortType,
    ISortItem,
    IMeasureSortItem,
    IMeasureSortTarget,
    ILocatorItem,
    IAttributeLocatorItem,
    IAttributeLocatorItemBody,
    IMeasureLocatorItem,
    IMeasureLocatorItemBody,
    isMeasureLocator,
    isAttributeLocator,
    isMeasureSort,
    isAttributeSort,
    isAttributeAreaSort,
    isAttributeValueSort,
    newMeasureSort,
    newMeasureSortFromLocators,
    newAttributeSort,
    newAttributeAreaSort,
    newAttributeLocator,
    SortEntityIds,
    sortEntityIds,
    sortDirection,
    sortMeasureLocators,
    attributeLocatorElement,
    attributeLocatorIdentifier,
    measureLocatorIdentifier,
} from "./execution/base/sort";

export {
    IAttributeElementsByRef,
    IAttributeElementsByValue,
    IAttributeElements,
    IPositiveAttributeFilter,
    IPositiveAttributeFilterBody,
    INegativeAttributeFilter,
    INegativeAttributeFilterBody,
    IAbsoluteDateFilter,
    IRelativeDateFilter,
    IMeasureValueFilter,
    IMeasureValueFilterBody,
    IRankingFilter,
    IRankingFilterBody,
    RankingFilterOperator,
    isRankingFilter,
    IFilter,
    INullableFilter,
    IMeasureFilter,
    IDateFilter,
    IAttributeFilter,
    isAbsoluteDateFilter,
    isRelativeDateFilter,
    isAllTimeDateFilter,
    attributeElementsIsEmpty,
    attributeElementsCount,
    isPositiveAttributeFilter,
    isNegativeAttributeFilter,
    isDateFilter,
    isMeasureValueFilter,
    ComparisonConditionOperator,
    IComparisonCondition,
    IComparisonConditionBody,
    IRangeCondition,
    IRangeConditionBody,
    MeasureValueFilterCondition,
    RangeConditionOperator,
    isAttributeFilter,
    isAttributeElementsByRef,
    isAttributeElementsByValue,
    isComparisonCondition,
    isComparisonConditionOperator,
    isFilter,
    isRangeCondition,
    isRangeConditionOperator,
    filterIsEmpty,
    filterAttributeElements,
    filterMeasureRef,
    filterObjRef,
    IAbsoluteDateFilterValues,
    IRelativeDateFilterValues,
    absoluteDateFilterValues,
    relativeDateFilterValues,
    measureValueFilterCondition,
    measureValueFilterMeasure,
    measureValueFilterOperator,
} from "./execution/filter";

export {
    newAbsoluteDateFilter,
    newNegativeAttributeFilter,
    newPositiveAttributeFilter,
    newRelativeDateFilter,
    newAllTimeFilter,
    newMeasureValueFilter,
    newRankingFilter,
} from "./execution/filter/factory";

export { mergeFilters } from "./execution/filter/filterMerge";

export {
    IMeasureTitle,
    IMeasureTitleBody,
    IMeasureDefinitionType,
    IMeasureDefinition,
    IMeasureDefinitionBody,
    ArithmeticMeasureOperator,
    IArithmeticMeasureDefinition,
    IPoPMeasureDefinition,
    IPoPMeasureDefinitionBody,
    IMeasure,
    IMeasureBody,
    MeasureAggregation,
    IPreviousPeriodMeasureDefinition,
    IPreviousPeriodMeasureDefinitionBody,
    IPreviousPeriodDateDataSet,
    isMeasure,
    isSimpleMeasure,
    isAdhocMeasure,
    isPoPMeasure,
    isPreviousPeriodMeasure,
    isArithmeticMeasure,
    isMeasureDefinition,
    isPoPMeasureDefinition,
    isPreviousPeriodMeasureDefinition,
    isArithmeticMeasureDefinition,
    measureLocalId,
    MeasurePredicate,
    anyMeasure,
    idMatchMeasure,
    measureDoesComputeRatio,
    measureItem,
    measureUri,
    measureIdentifier,
    measureMasterIdentifier,
    measureArithmeticOperands,
    measureAlias,
    measureTitle,
    measureArithmeticOperator,
    measureFormat,
    isMeasureFormatInPercent,
    measureAggregation,
    measureFilters,
    measurePopAttribute,
    measurePreviousPeriodDateDataSets,
    MeasureOrLocalId,
} from "./execution/measure";

export {
    IPreviousPeriodDateDataSetSimple,
    ArithmeticMeasureBuilder,
    MeasureBuilder,
    MeasureModifications,
    PoPMeasureBuilder,
    PreviousPeriodMeasureBuilder,
    MeasureBuilderBase,
    newMeasure,
    modifyMeasure,
    modifySimpleMeasure,
    modifyPopMeasure,
    modifyPreviousPeriodMeasure,
    newArithmeticMeasure,
    newPopMeasure,
    newPreviousPeriodMeasure,
    MeasureEnvelope,
    ArithmeticMeasureBuilderInput,
    PoPMeasureBuilderInput,
    PreviousPeriodMeasureBuilderInput,
} from "./execution/measure/factory";

export {
    IAttributeOrMeasure,
    IBucket,
    isBucket,
    idMatchBucket,
    anyBucket,
    MeasureInBucket,
    AttributeInBucket,
    newBucket,
    bucketIsEmpty,
    bucketAttributes,
    bucketAttribute,
    bucketAttributeIndex,
    bucketMeasure,
    bucketMeasureIndex,
    bucketMeasures,
    bucketTotals,
    bucketSetTotals,
    bucketItems,
    BucketPredicate,
    applyRatioRule,
    ComputeRatioRule,
    disableComputeRatio,
    BucketItemModifications,
    BucketItemReducer,
    bucketModifyItems,
    bucketItemReduce,
} from "./execution/buckets";

export {
    bucketsFind,
    bucketsMeasures,
    bucketsIsEmpty,
    bucketsAttributes,
    bucketsFindMeasure,
    bucketsById,
    bucketsFindAttribute,
    bucketsItems,
    bucketsTotals,
    bucketsModifyItem,
    bucketsReduceItem,
} from "./execution/buckets/bucketArray";

export { bucketItemLocalId } from "./execution/buckets/bucketItem";

export {
    IExecutionDefinition,
    IExecutionConfig,
    DimensionGenerator,
    defWithFilters,
    defFingerprint,
    defSetDimensions,
    defSetSorts,
    defTotals,
    defSetExecConfig,
    IPostProcessing,
    defSetPostProcessing,
} from "./execution/executionDefinition";

export {
    newDefForItems,
    newDefForBuckets,
    newDefForInsight,
    defWithDimensions,
    defWithSorting,
    defWithPostProcessing,
    defWithDateFormat,
    defWithExecConfig,
    defaultDimensionsGenerator,
    emptyDef,
} from "./execution/executionDefinition/factory";

export {
    GuidType,
    RgbType,
    IRgbColorValue,
    IColor,
    IColorPalette,
    IColorPaletteItem,
    IColorFromPalette,
    IRgbColor,
    isColorFromPalette,
    isRgbColor,
    colorPaletteItemToRgb,
    colorPaletteToColors,
    IColorPaletteMetadataObject,
    IColorPaletteDefinition,
} from "./colors";

export {
    IInsight,
    IInsightDefinition,
    IVisualizationClass,
    IVisualizationClassBody,
    VisualizationProperties,
    IColorMappingItem,
    isInsight,
    isColorMappingItem,
    insightRef,
    insightId,
    insightItems,
    insightMeasures,
    insightHasMeasures,
    insightAttributes,
    insightHasAttributes,
    insightHasDataDefined,
    insightProperties,
    insightBuckets,
    insightSorts,
    insightBucket,
    insightTags,
    insightSummary,
    insightTitle,
    insightUri,
    insightIsLocked,
    insightCreated,
    insightCreatedBy,
    insightUpdated,
    insightUpdatedBy,
    insightTotals,
    insightFilters,
    insightVisualizationUrl,
    insightSetFilters,
    insightSetBuckets,
    insightSetProperties,
    insightSetSorts,
    insightModifyItems,
    insightReduceItems,
    InsightDisplayFormUsage,
    insightDisplayFormUsage,
    visClassUrl,
    visClassId,
    visClassUri,
} from "./insight";

export {
    insightCreatedComparator,
    insightCreatedByComparator,
    insightTitleComparator,
    insightUpdatedComparator,
    insightUpdatedByComparator,
} from "./insight/comparators";

export { newInsightDefinition, InsightDefinitionBuilder, InsightModifications } from "./insight/factory";

export { insightSanitize, sanitizeBucketTotals } from "./insight/sanitization";

export { factoryNotationFor } from "./execution/objectFactoryNotation";

export {
    DateFilterOptionAbsoluteFormType,
    DateFilterOptionAbsolutePresetType,
    DateFilterOptionAllTimeType,
    DateFilterOptionType,
    DateFilterOptionRelativeFormType,
    DateFilterOptionRelativePresetType,
    RelativeDateFilterGranularityOffset,
    DateFilterGranularity,
    DateString,
    IAbsoluteDateFilterForm,
    IAbsoluteDateFilterPreset,
    IAllTimeDateFilterOption,
    IDateFilterConfig,
    IDateFilterOption,
    IRelativeDateFilterForm,
    IRelativeDateFilterPreset,
    IRelativeDateFilterPresetOfGranularity,
    isAbsoluteDateFilterForm,
    isAbsoluteDateFilterPreset,
    isAllTimeDateFilterOption,
    isDateFilterGranularity,
    isRelativeDateFilterForm,
    isRelativeDateFilterPreset,
} from "./dateFilterConfig";

export { IDashboardObjectIdentity } from "./dashboard/common";

export {
    DateFilterAbsoluteType,
    DateFilterRelativeType,
    DateFilterType,
    FilterContextItem,
    IDashboardAttributeFilter,
    IDashboardAttributeFilterParent,
    IDashboardAttributeFilterReference,
    IDashboardDateFilter,
    IDashboardDateFilterReference,
    IDashboardFilterReference,
    IFilterContext,
    IFilterContextBase,
    IFilterContextDefinition,
    ITempFilterContext,
    dashboardFilterReferenceObjRef,
    isAllTimeDashboardDateFilter,
    isDashboardAttributeFilter,
    isDashboardAttributeFilterReference,
    isDashboardDateFilter,
    isDashboardDateFilterReference,
    isFilterContext,
    isFilterContextDefinition,
    isTempFilterContext,
    newAbsoluteDashboardDateFilter,
    newAllTimeDashboardDateFilter,
    newRelativeDashboardDateFilter,
} from "./dashboard/filterContext";

export {
    IWidgetAlert,
    IWidgetAlertBase,
    IWidgetAlertDefinition,
    isWidgetAlert,
    isWidgetAlertDefinition,
} from "./dashboard/alert";

export {
    DrillDefinition,
    DrillOrigin,
    DrillOriginType,
    DrillTransition,
    DrillType,
    IDrill,
    IDrillFromAttribute,
    IDrillFromMeasure,
    IDrillOrigin,
    IDrillTarget,
    IDrillToAttributeUrl,
    IDrillToAttributeUrlTarget,
    IDrillToCustomUrl,
    IDrillToCustomUrlTarget,
    IDrillToDashboard,
    IDrillToInsight,
    IDrillToLegacyDashboard,
    InsightDrillDefinition,
    KpiDrillDefinition,
    isDrillFromAttribute,
    isDrillFromMeasure,
    isDrillToAttributeUrl,
    isDrillToCustomUrl,
    isDrillToDashboard,
    isDrillToInsight,
    isDrillToLegacyDashboard,
} from "./dashboard/drill";

export {
    BuiltInWidgetTypes,
    IBaseWidget,
    IDrillableWidget,
    IFilterableWidget,
    IWidgetDescription,
} from "./dashboard/baseWidget";

export {
    IKpi,
    IKpiBase,
    IKpiComparisonDirection,
    IKpiComparisonTypeComparison,
    IKpiWithPopComparison,
    IKpiWithPreviousPeriodComparison,
    IKpiWithComparison,
    IKpiWithoutComparison,
    isKpiWithComparison,
    isKpiWithoutComparison,
    isKpi,
} from "./dashboard/kpi";

export {
    AnalyticalWidgetType,
    WidgetType,
    IAnalyticalWidget,
    IKpiWidget,
    IKpiWidgetBase,
    IKpiWidgetDefinition,
    IInsightWidget,
    IInsightWidgetBase,
    IInsightWidgetDefinition,
    IInsightWidgetConfiguration,
} from "./dashboard/analyticalWidgets";

export {
    CatalogItemType,
    CatalogItem,
    ICatalogGroup,
    ICatalogAttribute,
    ICatalogFact,
    ICatalogMeasure,
    ICatalogDateDataset,
    ICatalogDateAttribute,
    isCatalogAttribute,
    isCatalogFact,
    isCatalogMeasure,
    isCatalogDateDataset,
    ICatalogItemBase,
    IGroupableCatalogItemBase,
    GroupableCatalogItem,
    catalogItemMetadataObject,
} from "./ldm/catalog";

export {
    IAttributeDisplayFormMetadataObject,
    isAttributeDisplayFormMetadataObject,
    IAttributeMetadataObject,
    isAttributeMetadataObject,
    IDataSetMetadataObject,
    isDataSetMetadataObject,
    IVariableMetadataObject,
    isVariableMetadataObject,
    IFactMetadataObject,
    isFactMetadataObject,
    IMetadataObjectDefinition,
    IMeasureMetadataObject,
    IMeasureMetadataObjectBase,
    isMeasureMetadataObject,
    IMeasureMetadataObjectDefinition,
    isMeasureMetadataObjectDefinition,
    IMetadataObject,
    IMetadataObjectBase,
    IMetadataObjectIdentity,
    isMetadataObject,
    MetadataObject,
    metadataObjectId,
    IDashboardMetadataObject,
    isDashboardMetadataObject,
    attributeDisplayFormMetadataObjectAttributeRef,
    attributeDisplayFormMetadataObjectRef,
    attributeDisplayFormMetadataObjectTitle,
} from "./ldm/metadata";

export {
    DataColumnType,
    DatasetLoadStatus,
    IDataColumnBody,
    IDataColumn,
    IDataHeader,
    IDatasetLoadInfo,
    IDatasetUser,
    IDataset,
    IDatasetBody,
} from "./ldm/datasets";

export { IAttributeElement } from "./ldm/attributeElement";

export {
    IWidget,
    IWidgetDefinition,
    isWidget,
    isWidgetDefinition,
    widgetUri,
    widgetId,
    widgetRef,
    widgetTitle,
    widgetType,
    isKpiWidgetDefinition,
    isKpiWidget,
    isInsightWidgetDefinition,
    isInsightWidget,
} from "./dashboard/widget";

export {
    IDashboardAttachment,
    isDashboardAttachment,
    IWidgetAttachment,
    isWidgetAttachment,
    IExportOptions,
    IScheduledMail,
    IScheduledMailDefinition,
    ScheduledMailAttachment,
    IScheduledMailBase,
} from "./dashboard/scheduledMail";

export { IUser, IWorkspaceUser, userFullName } from "./user";

export {
    IDashboardLayout,
    IDashboardWidget,
    IDashboardLayoutSection,
    IDashboardLayoutSectionHeader,
    IDashboardLayoutSize,
    IDashboardLayoutSizeByScreenSize,
    IDashboardLayoutItem,
    ScreenSize,
    isDashboardLayout,
    isDashboardLayoutSection,
    isDashboardLayoutItem,
    isDashboardWidget,
} from "./dashboard/layout";

export {
    IDashboard,
    IDashboardDefinition,
    IListedDashboard,
    ListedDashboardAvailability,
    IDashboardBase,
    IDashboardDateFilterConfig,
    DashboardDateFilterConfigMode,
    IDashboardDateFilterAddedPresets,
    IDashboardPluginBase,
    IDashboardPlugin,
    IDashboardPluginDefinition,
    IDashboardPluginLink,
    isDashboard,
    isDashboardDefinition,
    IAccessControlAware,
    ShareStatus,
} from "./dashboard/dashboard";

export { ISeparators, ISettings, PlatformEdition, IWhiteLabeling } from "./settings";

export { IWorkspaceUserGroup } from "./userGroup";

export {
    ThemeFontUri,
    ThemeColor,
    IThemeColorFamily,
    IThemeComplementaryPalette,
    IThemeWidgetTitle,
    IThemeTypography,
    IThemePalette,
    IThemeKpi,
    IThemeKpiValue,
    IThemeChart,
    IThemeTable,
    ITheme,
    IThemeAnalyticalDesigner,
    IThemeAnalyticalDesignerTitle,
    IThemeButton,
    IThemeDashboard,
    IThemeDashboardContent,
    IThemeDashboardContentKpi,
    IThemeDashboardContentWidget,
    IThemeDashboardEditPanel,
    IThemeDashboardFilterBar,
    IThemeDashboardFilterBarButton,
    IThemeDashboardNavigation,
    IThemeDashboardNavigationItem,
    IThemeDashboardNavigationTitle,
    IThemeDashboardSection,
    IThemeDashboardSectionDescription,
    IThemeDashboardSectionTitle,
    IThemeDashboardTitle,
    IThemeMetadataObject,
    IThemeDefinition,
    IThemeModal,
    IThemeModalTitle,
    IThemeTooltip,
} from "./theme";

export { IWorkspacePermissions, WorkspacePermission } from "./permissions";

export {
    DataValue,
    IMeasureDescriptor,
    IMeasureDescriptorObject,
    IMeasureDescriptorItem,
    IDimensionItemDescriptor,
    IDimensionDescriptor,
    IAttributeHeaderFormOf,
    IAttributeDescriptorBody,
    IAttributeDescriptor,
    IMeasureGroupDescriptor,
    IResultAttributeHeader,
    IResultHeader,
    IResultMeasureHeader,
    IResultAttributeHeaderItem,
    IResultMeasureHeaderItem,
    IResultTotalHeader,
    IResultTotalHeaderItem,
    ITotalDescriptor,
    ITotalDescriptorItem,
    IResultWarning,
    isAttributeDescriptor,
    isMeasureGroupDescriptor,
    isTotalDescriptor,
    isMeasureDescriptor,
    isResultAttributeHeader,
    isResultMeasureHeader,
    isResultTotalHeader,
    resultHeaderName,
    attributeDescriptorLocalId,
    attributeDescriptorName,
} from "./execution/results";

export {
    AccessGranteeDetail,
    IAccessGrantee,
    IUserAccess,
    IUserAccessGrantee,
    IUserGroupAccess,
    IUserGroupAccessGrantee,
    isUserAccess,
    isUserAccessGrantee,
    isUserGroupAccess,
    isUserGroupAccessGrantee,
} from "./accessControl";

export { IOrganizationDescriptor } from "./organization";
