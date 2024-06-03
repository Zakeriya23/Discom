import Profile from "./Profile.jsx";

export default function Contact({ id, username, onClick, selected, online }) {
  return (
    <div
      key={id}
      onClick={() => onClick(id)}
      className={`contact ${selected ? 'selected-contact' : ''}`}
    >
      {selected && (
        <div className="selected-indicator"></div>
      )}
      <div className="contact-details">
        <Profile online={online} username={username} userId={id} />
        <span className="contact-username">{username}</span>
      </div>
    </div>
  );
}
