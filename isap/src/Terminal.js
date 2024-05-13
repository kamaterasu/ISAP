import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import "./Terminal.css";

export default function TerminalController(props = {}) {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>I SUCK AT PROGRAMMING 🤡</TerminalOutput>,
  ]);
  const [colorMode, setColorMode] = useState(ColorMode.Dark);

  const handleInput = (terminalInput) => {
    const [command, ...args] = terminalInput.trim().split(" ");
    switch (command.toLowerCase()) {
      case "help":
        handleHelpCommand();
        break;
      case "clear":
        handleClearCommand();
        break;
      case "light":
        handleLightMode();
        break;
      case "dark":
        handleDarkMode();
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

  const handleHelpCommand = () => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        Available commands:
        <br />- help: Show this help message
        <br />- light: Switch to Light mode
        <br />- dark: Switch to Dark mode
        <br />- clear: Clear the terminal
      </TerminalOutput>,
    ]);
  };

  const handleClearCommand = () => {
    setTerminalLineData([]);
  };

  const handleLightMode = () => {
    setColorMode(ColorMode.Light);
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>Switched to Light Mode</TerminalOutput>,
    ]);
  };
  const handleDarkMode = () => {
    setColorMode(ColorMode.Dark);
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>Switched to Dark Mode</TerminalOutput>,
    ]);
  };

  return (
    <Terminal
      name="kamaterasu@isap"
      prompt="kamaterasu@isap:~$"
      height="86vh"
      colorMode={colorMode}
      onInput={handleInput}
    >
      {terminalLineData}
    </Terminal>
  );
}
