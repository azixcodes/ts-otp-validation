import { useRef } from "react";

const App = () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text");
    if (pastedData.length === 4 && /^\d+$/.test(pastedData)) {
      pastedData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      inputRefs.current[3]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-3">
      <h4 className="font-semibold">Verify your 4-digit OTP</h4>
      <div className="w-full max-w-xs flex items-center justify-center gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength={1}
            onChange={(e) => handleInputChange(e, index)}
            onPaste={handlePaste}
            className="h-10 w-10 rounded-md border focus:ring-1 ring-sky-500 outline-none text-center"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
