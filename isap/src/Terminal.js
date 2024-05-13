import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import "./Terminal.css";
export default function TerminalController(props = {}) {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>I SUCK AT PROGRAMMING 🤡</TerminalOutput>,
  ]);

  const handleInput = (terminalInput) => {
    const [command, ...args] = terminalInput.trim().split(" ");
    switch (command.toLowerCase()) {
      case "customcommand":
        handleCustomCommand(args);
        break;
      case "help":
        handleHelpCommand();
        break;
      case "clear":
        handleClearCommand();
        break;
      default:
        setTerminalLineData((prevData) => [
          ...prevData,
          <TerminalOutput>
            Unknown command: {command}. Type 'help' for a list of commands.
          </TerminalOutput>,
        ]);
        break;
    }
  };

  const handleCustomCommand = (args) => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        Custom command executed with arguments: {args.join(" ")}
      </TerminalOutput>,
    ]);
  };
  const handleHelpCommand = () => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        Available commands:
        <br />- customcommand [args]: Execute a custom command with arguments
      </TerminalOutput>,
    ]);
  };
  const handleClearCommand = () => {
    setTerminalLineData([]);
  };
  const handleLightMode = () => {};

  return (
    <Terminal
      name="kamaterasu@isap"
      prompt="kamaterasu@isap:~$"
      height="86vh"
      colorMode={ColorMode.Dark}
      onInput={handleInput}
    >
      {terminalLineData}
    </Terminal>
  );
}
