import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <p className="mb-4 text-muted-foreground">Page introuvable.</p>
        <Link to="/" className="text-primary underline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
