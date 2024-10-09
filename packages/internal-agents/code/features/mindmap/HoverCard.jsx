import React, { useRef, useEffect, useCallback } from 'react';
import { HoverCardContainer, HoverCardContent } from '@material-ui/core'; // Adjust the import based on your HoverCard library
import classNames from 'classnames';

const OPEN_DELAY = 700;
const CLOSE_DELAY = 300;

const HoverCard = ({ scope, children, open, defaultOpen, onOpenChange }) => {
    const hasSelectionRef = useRef(false);
    const isPointerDownOnContentRef = useRef(false);
    const openTimeoutRef = useRef(0);
    const closeTimeoutRef = useRef(0);

    const [isOpen, setIsOpen] = React.useState(open || defaultOpen);

    const handleOpen = useCallback(() => {
        clearTimeout(closeTimeoutRef.current);
        openTimeoutRef.current = window.setTimeout(() => setIsOpen(true), OPEN_DELAY);
    }, []);

    const handleClose = useCallback(() => {
        clearTimeout(openTimeoutRef.current);
        if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) {
            closeTimeoutRef.current = window.setTimeout(() => setIsOpen(false), CLOSE_DELAY);
        }
    }, []);

    const handleDismiss = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(openTimeoutRef.current);
            clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    return (
        <HoverCardContainer
            scope={scope}
            open={isOpen}
            onOpenChange={setIsOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            onDismiss={handleDismiss}
            hasSelectionRef={hasSelectionRef}
            isPointerDownOnContentRef={isPointerDownOnContentRef}
        >
            <HoverCardContent className={classNames(scope)}>
                {children}
            </HoverCardContent>
        </HoverCardContainer>
    );
};

export default HoverCard;