export interface Skill {
    name: string;
    icon: string;
    color: string;
    textColor: string;
}

export const devSkills: Skill[] = [
    { name: "HTML", icon: "devicon-html5-plain", color: "#e34c26", textColor: "#fff" },
    { name: "CSS", icon: "devicon-css3-plain", color: "#264de4", textColor: "#fff" },
    { name: "JavaScript", icon: "devicon-javascript-plain", color: "#f7df1e", textColor: "#000" },
    { name: "Astro", icon: "devicon-astro-plain", color: "#ff5d01", textColor: "#fff" },
    { name: "React", icon: "devicon-react-original", color: "#61dafb", textColor: "#000" },
    { name: "Node.js", icon: "devicon-nodejs-plain", color: "#339933", textColor: "#fff" },
    { name: "Python", icon: "devicon-python-plain", color: "#3776ab", textColor: "#fff" },
    { name: "PowerShell / Batch", icon: "devicon-bash-plain", color: "#5391fe", textColor: "#fff" },
    { name: "Java", icon: "devicon-java-plain", color: "#007396", textColor: "#fff" },
];

export const toolSkills: Skill[] = [
    { name: "Git", icon: "devicon-git-plain", color: "#f05032", textColor: "#fff" },
    { name: "GitHub", icon: "devicon-github-original", color: "#181717", textColor: "#fff" },
    { name: "VS Code", icon: "devicon-vscode-plain", color: "#007acc", textColor: "#fff" },
    { name: "After Effects", icon: "devicon-aftereffects-plain", color: "#9999ff", textColor: "#fff" },
    { name: "Illustrator", icon: "devicon-illustrator-plain", color: "#ff9a00", textColor: "#fff" },
];
