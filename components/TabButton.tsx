const getTabStyle = (isActive: boolean): preact.JSX.CSSProperties => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 0",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "10px",
  color: isActive ? "#007AFF" : "#8E8E93",
  outline: "none",
  WebkitTapHighlightColor: "transparent",
});

interface TabButtonProps {
  text: string;
  icon: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function TabButton(props: TabButtonProps) {
  return (
    <button
      style={getTabStyle(props.isActive)}
      type="button"
      onClick={props.onClick}
    >
      <span className="text-xl mb-0.5">{props.icon}</span>
      {props.text}
    </button>
  );
}
