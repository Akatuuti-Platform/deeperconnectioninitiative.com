package server

import (
	"flag"
	"fmt"
	"net/http"
	"time"

	"github.com/kolynzb/deeperconnectioninitiative.com/server/internal/app"
	"github.com/kolynzb/deeperconnectioninitiative.com/server/internal/routes"
)

func main() {

	var port int
	flag.IntVar(&port, "port", 8000, "backend server port")
	flag.Parse()

	app, err := app.NewApplication()
	if err != nil {
		panic(err)
	}

	defer app.DB.Close()

	 r := routes.SetupRoutes(app)
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		IdleTimeout:  time.Minute,
		Handler: r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	app.Logger.Printf("We are running on port %d", port)

	err = server.ListenAndServe()
	if err != nil {
		app.Logger.Fatal(err)
	}
}

