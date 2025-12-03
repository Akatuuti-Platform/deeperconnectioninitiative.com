package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/kolynzb/deeperconnectioninitiative.com/server/internal/app"
)

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()
	r.Get("/health", app.HealthCheck)

	// Workout
	r.Get("/workout/{id}", app.WorkoutHandler.HandleGetWorkoutById)
	r.Post("/workout", app.WorkoutHandler.HandleCreateWorkout)

	return r
}
