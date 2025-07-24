export default function Footer() {
  return (
    <div className="mt-16 text-sm text-gray-500 text-center">
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} Built with ❤️ by {" "}
        <span className="font-medium text-white">
          <strong className="text-white">Nico</strong>
        </span>
      </p>

      <footer className="mt-16 text-center text-sm"></footer>
    </div>
  );
}
