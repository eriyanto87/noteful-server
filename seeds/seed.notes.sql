BEGIN; 

INSERT INTO notes (notes_name, notes_content, date_modified)
VALUES
('First Note', 'moving', now()),
('Second Note', 'bootcamp', now()),
('Third Note', 'nes', now())
;

COMMIT;