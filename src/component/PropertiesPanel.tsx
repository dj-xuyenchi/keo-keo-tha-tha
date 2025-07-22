import React from "react";

export const PropertiesPanel = ({
  selected,
  onChange,
}: {
  selected: any | null;
  onChange: (field: string, value: any) => void;
}) => {
  if (!selected)
    return <div style={{ padding: 16 }}>No component selected</div>;

  return (
    <div
      style={{
        width: 200,
        borderLeft: "1px solid #ddd",
        padding: 16,
      }}
    >
      <h3>{selected.type} Properties</h3>
      {selected.type === "Button" && (
        <div>
          Text:
          <input
            type="text"
            value={selected.props.text}
            onChange={(e) => onChange("text", e.target.value)}
          />
        </div>
      )}
      {selected.type === "Input" && (
        <div>
          Placeholder:
          <input
            type="text"
            value={selected.props.placeholder}
            onChange={(e) => onChange("placeholder", e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
