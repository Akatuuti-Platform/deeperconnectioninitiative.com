-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXITS workouts (
    id BIGSERIAL PRIMARY KEY,
    -- userid
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    DURATION_MUNITES INTEGER NOT NULL,
    calories_burned INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
)
-- +goose StatementEnd

-- +goose Down 
-- +goose StatementBegin 
DROP TABLE workouts;
-- +goose StatementEnd
