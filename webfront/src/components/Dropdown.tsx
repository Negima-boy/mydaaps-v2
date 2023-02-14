import React,{
    FC,
    MouseEventHandler,
    PropsWithChildren,
    Ref,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import "../stylesheets/Dropdown.css"


const Icon: FC<PropsWithChildren> = ({ children }) => (
    <i className="material-symbols-outlined">{children}</i>
);

function useOnClickOutside(
    ref: RefObject<HTMLDivElement>,
    handler: MouseEventHandler<HTMLButtonElement>
) {
    useEffect(() => {
        const listener = (event: any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setIsOpen(false));

    return (
        <div ref={ref} className={`dropdown ${isOpen ? "open" : ""}`}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <Icon>business_center</Icon>
                <span>Info Sender</span>
                <Icon>{isOpen ? "close" : "expand_more"}</Icon>
            </button>
            <div className="menu">
                <button>
                    <span>0000 東邦大学</span>
                </button>
            </div>
        </div>
    );
};