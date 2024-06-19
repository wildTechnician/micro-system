import 'vue-cesium/Cesium';

declare global {
  namespace Cesium {
    export namespace Cesium3DTileset {
      export type FormatterConstructorOptions = {
        show?: boolean;
        modelMatrix?: Matrix4;
        modelUpAxis?: Axis;
        modelForwardAxis?: Axis;
        shadows?: ShadowMode;
        maximumScreenSpaceError?: number;
        cacheBytes?: number;
        maximumCacheOverflowBytes?: number;
        cullWithChildrenBounds?: boolean;
        cullRequestsWhileMoving?: boolean;
        cullRequestsWhileMovingMultiplier?: number;
        preloadWhenHidden?: boolean;
        preloadFlightDestinations?: boolean;
        preferLeaves?: boolean;
        dynamicScreenSpaceError?: boolean;
        dynamicScreenSpaceErrorDensity?: number;
        dynamicScreenSpaceErrorFactor?: number;
        dynamicScreenSpaceErrorHeightFalloff?: number;
        progressiveResolutionHeightFraction?: number;
        foveatedScreenSpaceError?: boolean;
        foveatedConeSize?: number;
        foveatedMinimumScreenSpaceErrorRelaxation?: number;
        foveatedInterpolationCallback?: Cesium3DTileset.foveatedInterpolationCallback;
        foveatedTimeDelay?: number;
        skipLevelOfDetail?: boolean;
        baseScreenSpaceError?: number;
        skipScreenSpaceErrorFactor?: number;
        skipLevels?: number;
        immediatelyLoadDesiredLevelOfDetail?: boolean;
        loadSiblings?: boolean;
        clippingPlanes?: ClippingPlaneCollection;
        classificationType?: ClassificationType;
        ellipsoid?: Ellipsoid;
        pointCloudShading?: any;
        lightColor?: Cartesian3;
        imageBasedLighting?: ImageBasedLighting;
        backFaceCulling?: boolean;
        enableShowOutline?: boolean;
        showOutline?: boolean;
        outlineColor?: Color;
        vectorClassificationOnly?: boolean;
        vectorKeepDecodedPositions?: boolean;
        featureIdLabel?: string | number;
        instanceFeatureIdLabel?: string | number;
        showCreditsOnScreen?: boolean;
        splitDirection?: SplitDirection;
        projectTo2D?: boolean;
        debugHeatmapTilePropertyName?: string;
        debugFreezeFrame?: boolean;
        debugColorizeTiles?: boolean;
        enableDebugWireframe?: boolean;
        debugWireframe?: boolean;
        debugShowBoundingVolume?: boolean;
        debugShowContentBoundingVolume?: boolean;
        debugShowViewerRequestVolume?: boolean;
        debugShowGeometricError?: boolean;
        debugShowRenderingStatistics?: boolean;
        debugShowMemoryUsage?: boolean;
        debugShowUrl?: boolean;
        customShader?: Cesium.CustomShader;
      };
    }
  }
}

export {};
