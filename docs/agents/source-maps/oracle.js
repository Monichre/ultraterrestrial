    async function A(P) {
        async function H() {
            var q, X;
            if (!s || !i || !o)
                return;
            const ee = [...((q = s.workflow_list) == null ? void 0 : q.filter(Q => i[Q.id] !== "pending")) || [], ...h.filter( ({id: Q}) => !g.includes(Q))].map( (Q, ne) => ({
                ...Q,
                order: ne + 1
            }));
            if (ee.length < 1) {
                se.error("Please keep at least 1 task in this recipe.");
                return
            }
            const Z = ((X = s.workflow_list) == null ? void 0 : X.length) !== ee.length || s.workflow_list.some( (Q, ne) => Q.task !== ee[ne].task);
            S(o, {
                workflow_list: ee,
                no_need_replan: Z,
                user_confirm: !0,
                requirement: s.requirement
            }),
            ae.oracleStream.updateStream({
                id: o,
                requirement: s.requirement,
                workflow: ee,
                no_need_replan: Z,
                user_confirm: !0
            }),
            d([]),
            p([]),
            n(null),
            b(o, !1),
            await rn.inputPanelReRunOracle(o)
        }
        async function V() {
            const ee = h.filter( ({id: ne}) => !g.includes(ne));
            if (ee.length < 1) {
                se.error("Please keep at least 1 task in this recipe.");
                return
            }
            if (f.trim().length === 0) {
                se.error("Please input your goal.");
                return
            }
            const Z = ee.map(ne => ({
                ...ne,
                executed: !1,
                response: [],
                percentage: void 0
            }))
              , q = _a()
              , X = {
                id: crypto.randomUUID(),
                requirement: f,
                conv_id: q,
                no_need_replan: !0,
                is_stop: !1,
                user_confirm: !0
            };
            S(X.id, {
                ...X,
                workflow_list: Z
            }),
            ae.oracleStream.addOneStream({
                ...X,
                workflow: Z
            });
            const Q = {
                id: crypto.randomUUID(),
                type: Y.question,
                position: {
                    x: 0,
                    y: 0
                },
                data: {
                    title: "",
                    value: X.requirement,
                    mode: "oracle",
                    oracleStreamId: X.id,
                    executed: !0,
                    timestamp: cv().unix().toString()
                },
                p_id: q,
                c_ids: [],
                conv_id: q
            };
            await x({
                nodes: [Q],
                needAwait: !0
            }),
            N(Q.id),
            rn.generateOracleNode(Q),
            await k()
        }
        switch (P) {
        case "normal":
            await H();
            break;
        case "duplicate":
            await V();
            break
        }
    }
    function U() {
        const P = Math.max(...h.map( ({order: H}) => H), 1);
        d([...h, {
            id: crypto.randomUUID(),
            order: P + 1,
            task: "",
            executed: !1,
            response: []
        }])
    }
    const {t: I} = Wl({
        source: {
            en: {
                yourGoal: "Goal:",
                goalPlaceholder: "Write your goal here...",
                pause: "Pause",
                resume: "Resume",
                recipeLabel: "Oracle Recipe",
                shareToCommunity: "Share to Community",
                cancel: "Cancel",
                scrollAction: {
                    up: "Scroll up",
                    down: "Scroll down",
                    scroll: "Scroll"
                },
                duplicateAndReRun: "Duplicate & Re-run",
                confirmAndRun: "Confirm & Run",
                generating: "Generating..."
            },
            zh: {
                yourGoal: "目的：",
                goalPlaceholder: "在这里写下你的目的...",
                pause: "暂停",
                resume: "继续",
                recipeLabel: "Oracle Recipe",
                shareToCommunity: "分享到社区",
                cancel: "取消",
                scrollAction: {
                    up: "向上滚动",
                    down: "向下滚动",
                    scroll: "滚动"
                },
                duplicateAndReRun: "复制并重新运行",
                confirmAndRun: "确认并运行",
                generating: "生成中..."
            },
            jp: {
                yourGoal: "目標：",
                goalPlaceholder: "ここに目的を書いてください...",
                pause: "一時停止",
                resume: "再開",
                recipeLabel: "Oracle Recipe",
                shareToCommunity: "コミュニティに共有",
                cancel: "キャンセル",
                scrollAction: {
                    up: "スクロールアップ",
                    down: "スクロールダウン",
                    scroll: "スクロール"
                },
                duplicateAndReRun: "複製して再実行",
                confirmAndRun: "確認して実行",
                generating: "生成中..."
            },
            tw: {
                yourGoal: "目的：",
                goalPlaceholder: "在這裡寫下你的目的...",
                pause: "暫停",
                resume: "繼續",
                recipeLabel: "Oracle Recipe",
                shareToCommunity: "分享到社區",
                cancel: "取消",
                scrollAction: {
                    up: "向上滾動",
                    down: "向下滾動",
                    scroll: "滾動"
                },
                duplicateAndReRun: "複製並重新運行",
                confirmAndRun: "確認並運行",
                generating: "生成中..."
            }
        },
        ns: "oraclePanel"
    })
      , L = w.useMemo( () => a === "duplicate" ? I(t ? "duplicateAndReRun" : "confirmAndRun") : y[o] ? I("generating") : I("confirmAndRun"), [a, y, o, t]);
    return m.jsxs(fe.div, {
        className: "relative mb-1.5 space-y-1.5",
        initial: {
            height: 0,
            opacity: 0,
            overflowY: "hidden"
        },
        animate: {
            height: "auto",
            opacity: 1,
            overflow: "visible",
            transition: {
                height: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                },
                opacity: {
                    duration: .4
                }
            }
        },
        exit: {
            height: 0,
            opacity: 0,
            overflowY: "hidden",
            transition: {
                height: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: .1
                },
                opacity: {
                    duration: .2
                }
            }
        },
        children: [m.jsxs("p", {
            className: "flex flex-col rounded-5/2xl bg-neutral-200/50 p-3 px-4 text-sm font-medium ring-1 ring-neutral-200",
            children: [m.jsx("span", {
                className: "font-mono text-[0.65rem] font-medium leading-3 text-neutral-400",
                children: I("yourGoal")
            }), a === "duplicate" ? m.jsx("input", {
                type: "text",
                autoFocus: !0,
                className: "border-b border-neutral-300 bg-transparent text-neutral-500",
                defaultValue: f,
                placeholder: I("goalPlaceholder"),
                onChange: P => v(P.target.value)
            }) : m.jsx("span", {
                className: "scrollbar-hide line-clamp-5 overflow-y-auto border-b border-transparent text-neutral-500",
                children: s == null ? void 0 : s.requirement
            })]
        }), m.jsx(nm, {
            ref: c,
            oraclePanelData: e,
            clearRecipe: r,
            editorStatus: a,
            editingList: h,
            setEditingList: d,
            checkedTaskIds: g,
            setCheckedTaskIds: p
        }), m.jsxs("p", {
            className: "flex select-none justify-between px-1.5 font-mono text-[0.65rem] text-neutral-400 dark:text-neutral-800",
            children: [m.jsx("span", {
                children: C
            }), o && m.jsxs("button", {
                onClick: () => {
                    C1(window.location.href, "plan_id", o),
                    E(!0)
                }
                ,
                children: [I("shareToCommunity"), m.jsx(O1, {
                    className: "inline size-3.5"
                })]
            })]
        }), m.jsxs("div", {
            className: "relative w-full overflow-hidden rounded-5/2xl border p-1.5 text-neutral-400",
            children: [m.jsx(fe.div, {
                className: "absolute left-0 top-0 -z-10 size-full origin-left rounded-5/2xl bg-neutral-200",
                style: {
                    scaleX: u
                }
            }), m.jsx(Pr, {
                mode: "popLayout",
                children: a ? m.jsxs(fe.div, {
                    className: "flex w-full items-center justify-between rounded-5/2xl text-neutral-400",
                    initial: {
                        scale: 0,
                        x: 400
                    },
                    animate: {
                        scale: 1,
                        x: 0
                    },
                    exit: {
                        scale: 0,
                        x: -400
                    },
                    transition: {
                        duration: .4
                    },
                    children: [m.jsx("div", {
                        className: "flex items-center gap-1",
                        children: m.jsx(Ee, {
                            content: "Insert new step",
                            delayDuration: 400,
                            color: "black",
                            children: m.jsx("button", {
                                onClick: U,
                                className: "inline-flex items-center justify-center rounded-full border bg-neutral-50 p-1.5 hover:bg-white",
                                children: m.jsx(F2, {
                                    className: "inline size-3 stroke-[2.5px]"
                                })
                            })
                        })
                    }), m.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [m.jsx("button", {
                            onClick: () => z(a),
                            className: "inline-flex items-center justify-center rounded-xl border bg-neutral-50 p-1 px-2 text-[0.65rem] font-medium hover:bg-white",
                            children: "Cancel"
                        }), m.jsx("button", {
                            disabled: y[o],
                            onClick: () => A(a),
                            className: "inline-flex items-center justify-center rounded-xl border bg-neutral-700 p-1 px-2 text-[0.65rem] font-medium text-neutral-200 hover:bg-black disabled:bg-neutral-600",
                            children: L
                        })]
                    })]
                }, "edit-buttons") : m.jsxs(fe.div, {
                    className: "flex w-full items-center justify-between rounded-5/2xl text-neutral-400",
                    initial: {
                        scale: 0,
                        x: 400
                    },
                    animate: {
                        scale: 1,
                        x: 0
                    },
                    exit: {
                        scale: 0,
                        x: -400
                    },
                    transition: {
                        duration: .4
                    },
                    children: [m.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [m.jsx(Ee, {
                            content: "Scroll up",
                            delayDuration: 200,
                            children: m.jsx("button", {
                                onClick: () => l("ArrowUp"),
                                className: "inline-flex items-center justify-center rounded-xl border bg-neutral-50 p-1.5 hover:bg-white",
                                children: m.jsx(R2, {
                                    className: "inline size-3 stroke-[2.5px]"
                                })
                            })
                        }), m.jsx(Ee, {
                            content: "Scroll down",
                            delayDuration: 200,
                            children: m.jsx("button", {
                                onClick: () => l("ArrowDown"),
                                className: "inline-flex items-center justify-center rounded-xl border bg-neutral-50 p-1.5 hover:bg-white",
                                children: m.jsx(k2, {
                                    className: " inline size-3 stroke-[2.5px]"
                                })
                            })
                        }), m.jsx("span", {
                            className: "mr-3 text-xs font-medium",
                            children: "Scroll"
                        })]
                    }), m.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [m.jsx(Ee, {
                            content: "Duplicate and re-run this recipe",
                            delayDuration: 200,
                            children: m.jsx("button", {
                                className: "inline-flex items-center justify-center rounded-xl border bg-neutral-50 p-1.5 enabled:hover:bg-white disabled:bg-neutral-300",
                                onClick: T,
                                children: m.jsx(P2, {
                                    className: "size-3 stroke-[2.5px]"
                                })
                            })
                        }), m.jsx("span", {
                            className: "mr-3 text-xs font-medium",
                            children: "Re-run"
                        })]
                    })]
                }, "default-buttons")
            })]
        })]
    }, "oracle-task-bar")
}
);
rm.displayName = "OraclePanel";
const FD = ({item: e, status: t}) => {
    const [r,a] = w.useState(!1);
    return m.jsxs("div", {
        className: "flex justify-between gap-2 rounded-lg px-0.5 text-sm font-medium",
        children: [m.jsxs("div", {
            className: "flex flex-1 gap-2 overflow-hidden",
            children: [m.jsxs("div", {
                className: re("flex items-center justify-center rounded p-0.5 size-fit", t === "done" && "bg-blue-100 text-blue-500", t === "in_progress" && "bg-green-100 text-green-500", t === "pending" && "bg-neutral-100 text-neutral-400"),
                children: [t === "done" && m.jsx(Uv, {
                    className: "size-3.5 text-blue-500"
                }), t === "in_progress" && m.jsx(j2, {
                    className: "size-3.5 animate-spin text-green-500"
                }), t === "pending" && m.jsx(I1, {
                    className: "size-3.5 text-neutral-400"
                })]
            }), m.jsx("p", {
                id: "scrollable",
                className: re("w-full text-neutral-500 cursor-default", r ? "scrollbar-hide max-h-none overflow-y-auto whitespace-normal" : "line-clamp-2 overflow-hidden"),
                onClick: () => a(!r),
                onBlur: () => a(!1),
                tabIndex: 0,
                children: e.task
            })]
        }), m.jsx("p", {
            className: re("flex items-center justify-center rounded text-xs font-mono w-10 h-5 select-none", t === "done" && "bg-blue-100 text-blue-500", t === "in_progress" && "bg-green-100 text-green-500", t === "pending" && "bg-neutral-100 text-neutral-400"),
            children: e.percentage || "-"
        })]
    }, e.id)
}
  , nm = w.memo(w.forwardRef( ({oraclePanelData: e, editorStatus: t, editingList: r, checkedTaskIds: a, setCheckedTaskIds: n, setEditingList: o}, s) => {
    const i = w.useMemo( () => {
        var v;
        if (t === "duplicate")
            return null;
        const {oracleChain: d, taskStatusMap: f} = e || {};
        if (!(!d || !f))
            return (v = d.workflow_list) == null ? void 0 : v.map(g => {
                const p = f[g.id];
                return t && p === "pending" ? null : m.jsx(FD, {
                    item: g,
                    status: p
                }, g.id)
            }
            )
    }
    , [t, e]);
    function c(d, f) {
        o(r.map(v => v.id === d ? {
            ...v,
            task: f
        } : v))
    }
    const l = (d, f, v) => {
        const g = d.slice();
        return g.splice(v < 0 ? g.length + v : v, 0, g.splice(f, 1)[0]),
        g
    }
      , u = d => {
        const {active: f, over: v} = d;
        if (f.id !== v.id) {
            const g = r.findIndex(b => b.id === f.id)
              , p = r.findIndex(b => b.id === v.id)
              , S = l(r, g, p).map( (b, y) => (b.order = y + 1,
            b));
            o(S)
        }
    }
      , h = d8($h(Gc, {
        activationConstraint: {
            distance: 8
        }
    }), $h(Bc, {
        coordinateGetter: DD
    }));
    return t ? m.jsx(hD, {
        sensors: h,
        collisionDetection: h8,
        onDragEnd: u,
        modifiers: [LD],
        autoScroll: !0,
        children: m.jsx("div", {
            ref: s,
            className: "scrollbar-hide flex h-48 max-h-48 flex-col items-stretch gap-2 overflow-y-auto rounded-5/2xl bg-white p-3 py-4 shadow outline-none",
            children: m.jsx(ED, {
                items: r,
                strategy: $D,
                children: r.map(d => m.jsx(zD, {
                    item: d,
                    editorStatus: t,
                    checkedTaskIds: a,
                    editTask: c,
                    setCheckedTaskIds: n
                }, d.id))
            })
        })
    }) : m.jsx("div", {
        ref: s,
        className: "scrollbar-hide flex h-48 flex-col items-stretch gap-2 overflow-y-auto scroll-smooth rounded-5/2xl bg-white p-3 py-4 shadow outline-none",
        children: i
    })
}
))
  , zD = ({item: e, editorStatus: t, checkedTaskIds: r, editTask: a, setCheckedTaskIds: n}) => {
    const {attributes: o, listeners: s, setNodeRef: i, transform: c, transition: l} = jD({
        id: e.id
    })
      , u = {
        transform: ba.Transform.toString(c),
        transition: l
    }
      , [h,d] = w.useState(!1)
      , f = navigator.userAgent.includes("Mac OS X");
    return m.jsxs("div", {
        ref: i,
        style: u,
        className: "flex items-center justify-between rounded-xl bg-neutral-100 p-0.5 text-sm font-medium",
        children: [m.jsxs("div", {
            className: "flex h-full flex-1 items-center",
            children: [m.jsx("div", {
                ...o,
                ...s,
                className: "drag-handle my-1 ml-1 inline-flex aspect-square size-6 cursor-grab items-center justify-center rounded-full bg-neutral-200 text-neutral-500",
                children: m.jsx(M2, {
                    className: "size-3 stroke-[2.5px]"
                })
            }), m.jsx(hv, {
                className: re("h-full flex-1 resize-none bg-neutral-100 px-1.5 py-[0.2rem] text-xs text-neutral-500 font-sans", h ? "focus:font-semibold scrollbar-hide" : "line-clamp-2 overflow-hidden", r.includes(e.id) && "line-through opacity-80", !f && "text-2xs tracking-wide"),
                value: e.task,
                onMouseMove: v => v.stopPropagation(),
                onPointerDown: v => v.stopPropagation(),
                onChange: v => a(e.id, v.target.value),
                onFocus: () => d(!0),
                onBlur: () => d(!1),
                maxRows: h ? void 0 : 2,
                onClick: () => d(!0),
                readOnly: !h
            })]
        }), m.jsxs("button", {
            onClick: () => {
                const v = r.includes(e.id) ? r.filter(g => g !== e.id) : [...r, e.id];
                n(v)
            }
            ,
            className: re("flex aspect-square size-6 items-center overflow-hidden justify-center rounded-full p-0.5 mr-1", r.includes(e.id) ? "bg-neutral-400 text-white" : "border bg-white text-neutral-400"),
            children: [m.jsx(z2, {
                className: "size-3 rounded-full stroke-[2.5px]"
            }), r.includes(e.id) || m.jsx(m.Fragment, {})]
        })]
    })
}
;
nm.displayName = "OracleTaskList";
const UD = ({onHoverStart: e, onHoverEnd: t, delay: r=100, threshold: a=75, enabled: n=!0}) => {
    const [o,s] = w.useState(!1)
      , i = w.useRef(null)
      , c = w.useRef(0)
      , l = w.useCallback(u => {
        if (!n)
            return;
        const h = Date.now();
        h - c.current < a || (c.current = h,
        i.current !== null && clearTimeout(i.current),
        i.current = window.setTimeout( () => {
            s(u),
            u ? e == null || e() : t == null || t()
        }
        , r))
    }
    , [e, t, r, a, n]);
    return w.useEffect( () => () => {
        i.current !== null && clearTimeout(i.current)
    }
    , []),
    {
        onHover: {
            onPointerEnter: u => {
                u.target.getAttribute("datatype") !== "disable-hover" && n && ["mouse", "pen"].includes(u.pointerType) && l(!0)
            }
            ,
            onPointerLeave: u => {
                u.target.getAttribute("datatype") !== "disable-hover" && n && ["mouse", "pen"].includes(u.pointerType) && l(!1)
            }
        },
        isHovering: o
    }
}
  , am = w.memo( ({max: e=100, min: t=0, value: r=0, className: a}) => {
    const n = 2 * Math.PI * 45
      , o = n / 100
      , s = (r - t) / (e - t) * 100;
    return m.jsxs("svg", {
        className: re("size-10", a),
        viewBox: "0 0 100 100",
        style: {
            fill: "none",
            strokeDashoffset: 0,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            transform: "translateZ(0)"
        },
        children: [m.jsx("circle", {
            cx: "50",
            cy: "50",
            r: "40",
            className: "stroke-neutral-500/20",
            style: {
                strokeDasharray: `${(90 - s) * o}px ${n}px`,
                transform: `rotate(${270 - 5 * 3.6 * 1}deg) scaleY(-1)`,
                transition: "all 1s ease 0s",
                transformOrigin: "50px 50px"
            }
        }), m.jsx("circle", {
            cx: "50",
            cy: "50",
            r: "40",
            style: {
                strokeDasharray: `${s * o}px ${n}px`,
                transition: "1s ease 0s",
                transitionProperty: "stroke-dasharray,transform",
                transform: `rotate(${-90 + 5 * 0 * 3.6}deg)`,
                transformOrigin: "50px 50px"
            }
        })]
    })
}
);
am.displayName = "CircularProgressBar";
const BD = ({className: e, isOpen: t, notice: r}) => m.jsx(Pr, {
    children: t && m.jsx(fe.div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        className: re("fixed inset-0 bg-black/40 z-40", e),
        onClick: () => {
            r && se.info(r)
        }
    })
})
  , HD = e => ({
    nodes: e.nodes,
    edges: e.edges,
    setNodes: e.setNodes,
    updateNode: e.updateNode,
    updateNodes: e.updateNodes,
    setEdges: e.setEdges,
    globalStatus: e.globalStatus,
    selectedNodeId: e.selectedNodeId,
    setGeneratingNodeIds: e.setGeneratingNodeIds,
    textCursorPosition: e.textCursorPosition,
    setTextCursorPosition: e.setTextCursorPosition,
    generatingNodeIds: e.generatingNodeIds,
    setCancelCurrentReader: e.setCancelCurrentReader,
    isOpenInputMenu: e.isOpenInputMenu,
    setIsOpenInputMenu: e.setIsOpenInputMenu,
    setCurrentExpandedId: e.setCurrentExpandedId,
    anchorToSpend: e.anchorToSpend,
    visNodeId: e.visNodeId,
    setVisNodeId: e.setVisNodeId,
    deleteNode: e.deleteNode,
    setSelectNodeId: e.setSelectedNodeId,
    setCenterNodeId: e.setCenterNodeId,
    editingQuestionNodes: e.editingQuestionNodes,
    addEditingQuestionNode: e.addEditingQuestionNode,
    removeEditingQuestionNode: e.removeEditingQuestionNode,
    clearEditingQuestionNodes: e.clearEditingQuestionNodes
})
  , GD = ({selectedNodeId: e, blink: t}) => {
    const r = w.useRef(new Map).current
      , {getNode: a} = Ge()
      , {conversationId: n} = D1()
      , o = a(e || n || "");
    return o ? m.jsx(KD, {
        selectedNode: o,
        blink: t,
        contentMap: r
    }) : null
}
;
GD.displayName = "InputBar";