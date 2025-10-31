// main.js
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ------------------ PROFILE SECTION ------------------
const nameInput = document.getElementById("name");
const skillsInput = document.getElementById("skills");
const interestsInput = document.getElementById("interests");
const saveButton = document.getElementById("saveProfile");
const profileList = document.getElementById("profileList");

const profilesRef = collection(db, "studentProfiles");

async function addProfile() {
  const name = nameInput.value.trim();
  const skills = skillsInput.value.trim();
  const interests = interestsInput.value.trim();

  if (!name || !skills || !interests) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    await addDoc(profilesRef, {
      name,
      skills,
      interests: interests.toLowerCase(),
      timestamp: new Date()
    });
    alert("✅ Profile saved!");
    nameInput.value = "";
    skillsInput.value = "";
    interestsInput.value = "";
    loadProfiles();
  } catch (error) {
    console.error("Error adding profile: ", error);
  }
}

async function loadProfiles() {
  profileList.innerHTML = "";
  const snapshot = await getDocs(profilesRef);
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.name}</strong><br>
      🧠 Skills: ${data.skills}<br>
      💡 Interests: ${data.interests}
    `;
    profileList.appendChild(li);
  });
}

saveButton.addEventListener("click", addProfile);
loadProfiles();

// ------------------ MATCHMAKING SECTION ------------------
const searchInput = document.getElementById("searchInterest");
const findButton = document.getElementById("findMatches");
const matchList = document.getElementById("matchList");

const findMatches = async () => {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) return alert("Enter an interest to search!");
  matchList.innerHTML = "";

  const snapshot = await getDocs(profilesRef);
  let found = false;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.interests.includes(term)) {
      found = true;
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${data.name}</strong><br>
        🧠 Skills: ${data.skills}<br>
        💡 Interests: ${data.interests}
      `;
      matchList.appendChild(li);
    }
  });

  if (!found) matchList.innerHTML = "<li>No matches found 😢</li>";
};

findButton.addEventListener("click", findMatches);

// ------------------ CHAT SECTION ------------------
const chatBox = document.getElementById("chat-box");
const chatName = document.getElementById("chatName");
const chatMessage = document.getElementById("chatMessage");
const sendMessageBtn = document.getElementById("sendMessage");

const chatRef = collection(db, "chatMessages");

async function sendMessage() {
  const name = chatName.value.trim();
  const message = chatMessage.value.trim();

  if (!name || !message) {
    alert("Enter both name and message!");
    return;
  }

  await addDoc(chatRef, {
    name,
    message,
    timestamp: serverTimestamp()
  });

  chatMessage.value = "";
}

// Real-time listener for chat
const q = query(chatRef, orderBy("timestamp"));
onSnapshot(q, (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const msg = document.createElement("div");
    msg.className = "chat-message";
    msg.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
    chatBox.appendChild(msg);
  });
  chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll to bottom
});

sendMessageBtn.addEventListener("click", sendMessage);

// ------------------ PROJECT IDEA BOARD ------------------
const projectName = document.getElementById("projectName");
const projectDesc = document.getElementById("projectDesc");
const projectBy = document.getElementById("projectBy");
const postProjectBtn = document.getElementById("postProject");
const projectList = document.getElementById("projectList");

const projectsRef = collection(db, "projectIdeas");

// 📝 Add a new project idea
async function addProject() {
  const name = projectName.value.trim();
  const desc = projectDesc.value.trim();
  const by = projectBy.value.trim();

  if (!name || !desc || !by) {
    alert("Please fill in all fields!");
    return;
  }

  await addDoc(projectsRef, {
    projectName: name,
    description: desc,
    postedBy: by,
    timestamp: serverTimestamp()
  });

  projectName.value = "";
  projectDesc.value = "";
  projectBy.value = "";
  alert("✅ Project idea posted!");
}

// 📋 Load project ideas (live updates)
const qProjects = query(projectsRef, orderBy("timestamp", "desc"));
onSnapshot(qProjects, (snapshot) => {
  projectList.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.projectName}</strong><br>
      🧠 ${data.description}<br>
      👤 Posted by: ${data.postedBy}
    `;
    projectList.appendChild(li);
  });
});

postProjectBtn.addEventListener("click", addProject);
