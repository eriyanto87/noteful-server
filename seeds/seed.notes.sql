BEGIN; 

INSERT INTO notes (notes_name, notes_content, date_modified, folder_id)
VALUES
('First Note', 'moving', now(), 1),
('Second Note', 'bootcamp', now(), 2),
('Third Note', 'nes', now(), 1)
;

COMMIT;