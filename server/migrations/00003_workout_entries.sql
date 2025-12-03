-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXITS workout_entries (
    id BIGSERIAL PRIMARY KEY,
    workout_id BIGINT NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_name VARCHAR(255) UNIQUE NOT NULL,
    notes TEXT,
    sets INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    reps INTEGER,
    duration_seconds INTEGER,
    weight DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT valid_workout_entry CHECK (
    (reps IS NOT NULL or duration_seconds is not null) AND
    (reps IS NULL OR duration_seconds IS NULL)
)
)
-- +goose StatementEnd

-- +goose Down 
-- +goose StatementBegin 
DROP TABLE workout_entries;
-- +goose StatementEnd
