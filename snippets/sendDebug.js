// run listener like  nc -k -u -l 127.0.0.1 8008
const DEBUG_ADDRESS = "127.0.0.1";

const dgram = require("node:dgram");
// import dgram from "node:dgram";

/**
 * Sends a UTF‑8 encoded string via UDP to DEBUG_ADDRESS:8008.
 * @param {string} msg - The text to send.
 * @param {boolean} includeStack - include stack in dump
 */
function sendDebug(msg, includeStack = false) {
  const socket = dgram.createSocket("udp4");

  let formattedMsg = `${timestamp()}: ${msg}\n`;

  if (includeStack === true) {
    try {
      throw new Error("...");
    } catch (err) {
      formattedMsg += `\nstack: ${err.stack}\n`;
    }
  }

  const buffer = Buffer.from(formattedMsg, "utf8");
  socket.send(buffer, 0, buffer.length, 8008, DEBUG_ADDRESS, (err) => {
    socket.close(); // always close the socket
    if (err) console.error("UDP send error:", err);
  });
}

function timestamp() {
  return formatDate(new Date());
}
/**
 *
 * @param {Date} date
 * @returns
 */
function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // months are zero‑based
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example
const now = new Date();
console.log(formatDate(now)); // e.g. "2025-09-18 14:05:23"

module.exports = { sendDebug };
