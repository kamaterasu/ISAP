import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import "./Terminal.css";

const ASCII_ART = `  _                         _
 | |                       | |
 | | ____ _ _ __ ___   __ _| |_ ___ _ __ __ _ ___ _   _
 | |/ / _\` | '_ \` _ \\ / _\` | __/ _ \\ '__/ _\` / __| | | |
 |   < (_| | | | | | | (_| | ||  __/ | | (_| \\__ \\ |_| |
 |_|\\_\\__,_|_| |_| |_|\\__,_|\\__\\___|_|  \\__,_|___/\\__,_|
`;

export default function TerminalController(props = {}) {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>
      <span className="gradient-command">{ASCII_ART}</span>
    </TerminalOutput>,
    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>
      <span className="suck-text">I SUCK AT PROGRAMMING 🤡</span>
    </TerminalOutput>,
  ]);
  const [colorMode, setColorMode] = useState(ColorMode.Dark);
  // eslint-disable-next-line
  const [projects, setProjects] = useState(["ISAP"]);

  const handleInput = (terminalInput) => {
    // eslint-disable-next-line
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
      case "ls":
        handleListProjects();
        break;
      case "whoami":
        handleWhoamiCommand();
        break;
      case "social":
        handleSocialCommand();
        break;
      default:
        setTerminalLineData((prevData) => [
          ...prevData,
          <TerminalOutput>
            <span className="unknown-command">
              Unknown command: {command}. Type 'help' for a list of commands.
            </span>
          </TerminalOutput>,
        ]);
        break;
    }
  };

  const handleHelpCommand = () => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        <span className="green-command">
          Available commands:
          <br />- whoami: Display information about the author
          <br />- help: Show this help message
          <br />- light: Switch to Light mode
          <br />- dark: Switch to Dark mode
          <br />- clear: Clear the terminal
          <br />- ls: List projects
          <br />- social: Display social media links
        </span>
      </TerminalOutput>,
    ]);
  };
  const handleWhoamiCommand = () => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        <span className="gradient-text">
          Name: Tuguldur Bayartsolmon
          <br />
          Occupation: Student
          <br />
          Location: Earth
          <br />
          Interests: Programming, Gaming, Trying new Things
        </span>
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

  const handleListProjects = () => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        Projects:
        <br />
        {projects.map((project, index) => (
          <span key={index}>
            <a href={`#${project}`} onClick={() => handleProjectClick(project)}>
              {project}
            </a>
            <br />
          </span>
        ))}
      </TerminalOutput>,
    ]);
  };

  const handleProjectClick = (project) => {
    window.open(`https://github.com/kamaterasu/${project}`, "_blank");
  };
  const handleSocialCommand = () => {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalOutput>
        <span className="">
          GitHub: <a href="https://github.com/kamaterasu">kamaterasu</a>
          <br />
        </span>
      </TerminalOutput>,
    ]);
  };
  return (
    <Terminal
      className="custom-terminal"
      name="kamaterasu@isap"
      prompt="kamaterasu@isap:~$"
      height="100vh"
      colorMode={colorMode}
      onInput={handleInput}
    >
      {terminalLineData}
    </Terminal>
  );
}
