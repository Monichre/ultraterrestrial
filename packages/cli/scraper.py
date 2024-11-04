import csv
from datetime import datetime
from pathlib import Path
import os
import json
from firecrawl import FirecrawlApp
from anthropic import Anthropic
from dotenv import load_dotenv
from urls import urls
# Load environment variables
load_dotenv()

# Retrieve API keys from environment variables
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
firecrawl_api_key = os.getenv("FIRECRAWL_API_KEY")

async def process_urls():
    
    firecrawl_app = FirecrawlApp(api_key=firecrawl_api_key)
anthropic_client = Anthropic(api_key=anthropic_api_key)
    # Create output directory
    output_dir = Path("docs")
    output_dir.mkdir(exist_ok=True)

    # Process URLs and get results
    results = []
    async for url in urls:
        result = await firecrawl_app.crawl(url)
        print(result)
        
        
        if result.success:
            results.append(result)
            # Generate markdown filename
            safe_filename = "".join(c if c.isalnum() else "_" for c in result.url)
            markdown_path = output_dir / f"{safe_filename}_{datetime.now().strftime('%Y%m%d')}.md"
            
            # Write markdown file
            with open(markdown_path, "w", encoding="utf-8") as f:


    
    return results
        class Z extends ( () => n(883355))().Z {
            constructor() {
                super(...arguments),
                this.popupEl = null,
                this.observer = void 0,
                this.isAnimating = !1,
                this.storeTypes = {
                    store: y().ZP
                },
                this.listenWhenOpen = new (n(662193).EJ)("listenWhenOpen"),
                this.popupContentRef = o.createRef(),
                this.renderPopupContent = () => {
                    const e = G(this.stores.store, this.props.placementToOrigin)
                      , t = F(this.props.alignmentToOrigin)
                      , {offsetX: n, offsetY: o} = this.stores.store.state;
                    return (0,
                    v.jsx)(Q, {
                        keepFocus: this.props.keepFocus,
                        preventCaptureEsc: this.props.preventCaptureEsc,
                        onDismiss: this.props.onDismiss,
                        children: i => (0,
                        v.jsxs)("div", {
                            ...i,
                            ref: this.popupContentRef,
                            children: [this.props.open && !this.props.disableMouseCapture && (0,
                            v.jsx)("div", {
                                className: this.props.className,
                                style: X(this.environment, this.props.popupType, this.props.disableDarkOverlayBackground),
                                onMouseDown: $,
                                onClick: this.CLASS_COMPONENT_CONVERSION_DO_NOT_TOUCH_handleBgClick,
                                onContextMenu: this.props.onDismiss
                            }), (0,
                            v.jsx)(b, {
                                style: H(this.stores.store, this.props.enableRounding, this.props.alignBoxStyle),
                                origin: (0,
                                v.jsx)("div", {
                                    style: W(this.stores.store)
                                }),
                                placement: e,
                                alignment: t,
                                childrenWrapStyle: {
                                    pointerEvents: this.props.open && !this.props.preventPointerEvents ? "auto" : "none"
                                },
                                children: (0,
                                v.jsx)(j().Z, {
                                    blockRenderQueueOnEnter: !this.props.preventBlockRenderQueueOnEnter,
                                    isVisible: this.props.open,
                                    animationStyle: N(this.props.open, this.props.preventScaleTransition, this.props.preventOpacityTransition),
                                    enterAnimationStyle: Y(this.props.popupType, this.props.preventOpacityTransition, this.props.preventScaleTransition),
                                    exitAnimationStyle: Y(this.props.popupType, this.props.preventOpacityTransition, this.props.preventScaleTransition),
                                    onAnimationStart: this.handleAnimatedAnimationStart,
                                    onAnimationEnd: this.handleAnimatedAnimationEnd,
                                    render: () => (0,
                                    v.jsxs)("div", {
                                        style: q(this.stores.store, this.props.placementToOrigin, this.props.alignmentToOrigin, this.props.originGap),
                                        children: [(0,
                                        v.jsx)("div", {
                                            role: "dialog",
                                            "aria-label": this.props.ariaLabel,
                                            "aria-labelledby": this.props.ariaLabelledBy,
                                            "aria-describedby": this.props.ariaDescribedBy,
                                            style: {
                                                ...U(this.environment, this.theme, this.stores.store, this.props.borderRadius, this.props.isWaxPaper, this.props.useLightBoxShadow, this.props.sameWidthAsOrigin, this.props.isFullWidthOnMobile, this.props.style),
                                                ...this.props.popupWrapStyle
                                            },
                                            ref: this.handlePopupMount,
                                            children: this.props.render()
                                        }), this.props.showCaret && (0,
                                        v.jsx)(D, {
                                            placement: e,
                                            offsetX: -2 * n,
                                            offsetY: -2 * o
                                        })]
                                    })
                                })
                            })]
                        })
                    })
                }
                ,
                this.handlePopupMount = e => {
                    this.popupEl = e,
                    e ? (this.observer || this.props.disableMutationObserver || (this.observer = new MutationObserver(this.handleObserverChangeThrottled),
                    this.observer.observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })),
                    this.keepInBound()) : this.observer && (this.observer.disconnect(),
                    this.observer = void 0)
                }
                ,
                this.handleObserverChange = () => {
                    this.isAnimating || this.keepInBound()
                }
                ,
                this.handleObserverChangeThrottled = c().P2(this.handleObserverChange, 10),
                this.handleAnimatedAnimationStart = () => {
                    this.isAnimating = !0
                }
                ,
                this.handleAnimatedAnimationEnd = () => {
                    var e, t;
                    (this.isAnimating = !1,
                    this.props.open) || (z(this.stores.store),
                    null === (e = (t = this.props).onClosed) || void 0 === e || e.call(t));
                    this.props.onAnimationEnd && this.props.onAnimationEnd(),
                    this.keepInBound(),
                    V(this.environment, this.props.open)
                }
                ,
                this.handleResize = () => {
                    this.props.open && (this.measureOriginRect(),
                    this.keepInBound())
                }
                ,
                this.handleResizeLater = () => {
                    setTimeout(( () => {
                        this.handleResize()
                    }
                    ))
                }
                ,
                this.CLASS_COMPONENT_CONVERSION_DO_NOT_TOUCH_handleBgClick = e => _(e, this.props.onDismiss),
                this.handleEstimatedKeyboardWebViewOverlapChange = () => {
                    this.forceUpdate()
                }
                ,
                this.handleEstimatedKeyboardWebViewOverlapChangeDebounced = c().Ds(this.handleEstimatedKeyboardWebViewOverlapChange, 10),
                this.handleResizeDebounced = c().Ds(this.handleResize, 10)
            }
            UNSAFE_willReceiveProps(e) {
                const t = !this.props.open && e.open
                  , n = this.props.open && !e.open;
                t && !K(e.popupType) && this.measureOriginRect(),
                e.preventPointerEvents || (t && (m().Z.state.openPopups.add(this),
                m().Z.emit()),
                n && (m().Z.state.openPopups.delete(this),
                m().Z.emit()))
            }
            UNSAFE_willUpdate(e) {
                const t = this.stores.store.state;
                e.open && !t.open && this.stores.store.setState({
                    ...t,
                    open: !0
                })
            }
            didMount() {
                this.props.open && (K(this.props.popupType) || this.measureOriginRect(),
                this.stores.store.setState({
                    ...this.stores.store.state,
                    open: !0
                }),
                m().Z.state.openPopups.add(this),
                m().Z.emit())
            }
            didUpdate(e) {
                var t, n, o, i;
                super.didUpdate(e),
                t = this.props.popupType,
                n = this.props.preventScaleTransition,
                o = this.props.preventOpacityTransition,
                i = this.props.preventSlideUpTransition,
                (!K(t) && n && o || K(t) && i) && (!this.props.open && this.stores.store.state.open && z(this.stores.store),
                e.open && V(this.environment, this.props.open))
            }
            didMountOrUpdate() {
                this.listenWhenOpen.effect(( () => {
                    var e;
                    if (!this.props.open)
                        return;
                    const {device: t} = this.environment;
                    t.isMobile ? f().Z.addListener(this.handleEstimatedKeyboardWebViewOverlapChangeDebounced) : window.addEventListener("resize", this.handleResizeDebounced);
                    const n = e => {
                        if (!this.props.open || !this.props.enableOutsideClickDismiss)
                            return;
                        const t = this.popupContentRef.current
                          , n = e.target;
                        var o, i;
                        t && n && (t === n || t.contains(n) || null === (o = (i = this.props).onDismiss) || void 0 === o || o.call(i, e))
                    }
                    ;
                    return window.addEventListener("click", n),
                    window.addEventListener("contextmenu", n),
                    null === (e = this.props.forceRemeasureStore) || void 0 === e || e.addListener(this.handleResizeLater),
                    () => {
                        var e;
                        f().Z.removeListener(this.handleEstimatedKeyboardWebViewOverlapChangeDebounced),
                        window.removeEventListener("resize", this.handleResizeDebounced),
                        window.removeEventListener("click", n),
                        window.removeEventListener("contextmenu", n),
                        null === (e = this.props.forceRemeasureStore) || void 0 === e || e.removeListener(this.handleResizeLater)
                    }
                }
                ), [this.props.open, this.props.forceRemeasureStore, this.stores.store.state.placementFlipped])
            }
            willUnmount() {
                this.props.open && !this.props.preventPointerEvents && (m().Z.state.openPopups.delete(this),
                m().Z.emit()),
                this.listenWhenOpen.unmount()
            }
            renderComponent() {
                const {device: e} = this.environment
                  , t = this.stores.store.state.open;
                return (0,
                v.jsx)(n(155856).Z, {
                    capture: Boolean(this.props.open && this.props.disableContentScroll),
                    preventType: n(434859).Z.All,
                    children: (0,
                    v.jsx)(n(804827).Z, {
                        open: t,
                        trapFocus: this.props.trapFocus,
                        origin: this.renderOrigin(),
                        useCompositeLayer: e.isMobile,
                        overlayContainerStore: this.props.overlayContainerStore,
                        zIndex: this.props.overlayContainerZIndex,
                        children: K(this.props.popupType) ? (0,
                        v.jsx)(J, {
                            ...this.props,
                            handleAnimatedAnimationStart: this.handleAnimatedAnimationStart,
                            handleAnimatedAnimationEnd: this.handleAnimatedAnimationEnd
                        }) : this.renderPopupContent()
                    })
                })
            }
            renderOrigin() {
                return this.props.originRect && this.stores.store.setState({
                    ...this.stores.store.state,
                    originRect: this.props.originRect
                }),
                this.props.origin
            }
            measureOriginRect() {
                if (this.props.originRect)
                    this.stores.store.setState({
                        ...this.stores.store.state,
                        originRect: this.props.originRect
                    });
                else if (this.componentIsMounted) {
                    const e = i.findDOMNode(this);
                    if (e && e instanceof Element) {
                        const t = e.getBoundingClientRect();
                        this.stores.store.setState({
                            ...this.stores.store.state,
                            originRect: t
                        })
                    }
                }
            }
            keepInBound() {
                const {disableFlippingPlacement: e=!1} = this.props;
                if (this.popupEl) {
                    const {originRect: t} = this.stores.store.state
                      , o = this.popupEl.getBoundingClientRect();
                    this.props.open && t && (this.props.forceInitialInbound || o.height > 0) && n(709700).m({
                        store: this.stores.store,
                        placementToOrigin: A(this.props.placementToOrigin),
                        alignmentToOrigin: F(this.props.alignmentToOrigin),
                        originRect: t,
                        popupRect: o,
                        placementFlipped: this.stores.store.state.placementFlipped,
                        disableFlippingPlacement: e,
                        viewportAdditionalBottomPadding: f().Z.keyboardHeight(),
                        originGap: this.props.originGap,
                        viewportPadding: this.props.viewportPadding
                    })
                }
            }
        }

