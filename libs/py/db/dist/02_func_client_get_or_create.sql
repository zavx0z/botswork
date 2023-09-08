create function client_get_or_create(
    p_user_id uuid,
    p_device_family character varying,
    p_device_brand character varying,
    p_device_model character varying,
    p_os_family character varying,
    p_os_major character varying,
    p_os_minor character varying,
    p_os_patch character varying,
    p_os_patch_minor character varying,
    p_browser_family character varying,
    p_browser_major character varying,
    p_browser_minor character varying,
    p_browser_patch character varying
)
    returns SETOF client
    language plpgsql
as
$$
DECLARE
    v_device_id            INT;
    v_os_id                INT;
    v_browser_id           INT;
    v_device_browser_os_id INT;
BEGIN
    -- Get or create device
    INSERT INTO device (family, brand, model, created_at)
    VALUES (p_device_family, p_device_brand, p_device_model, NOW())
    ON CONFLICT (family, brand, model) DO NOTHING;

    SELECT device.id
    INTO v_device_id
    FROM device
    WHERE family = p_device_family
      AND (brand = p_device_brand OR (brand IS NULL AND p_device_brand IS NULL))
      AND (model = p_device_model OR (model IS NULL AND p_device_model IS NULL));

    -- Get or create OS
    INSERT INTO os (family, major, minor, patch, patch_minor, created_at)
    VALUES (p_os_family, p_os_major, p_os_minor, p_os_patch, p_os_patch_minor, NOW())
    ON CONFLICT (family, major, minor, patch, patch_minor) DO NOTHING;

    SELECT os.id
    INTO v_os_id
    FROM os
    WHERE family = p_os_family
      AND (major = p_os_major OR (major IS NULL AND p_os_major IS NULL))
      AND (minor = p_os_minor OR (minor IS NULL AND p_os_minor IS NULL))
      AND (patch = p_os_patch OR (patch IS NULL AND p_os_patch IS NULL))
      AND (patch_minor = p_os_patch_minor OR (patch_minor IS NULL AND p_os_patch_minor IS NULL));

    -- Get or create browser
    INSERT INTO browser (family, major, minor, patch, created_at)
    VALUES (p_browser_family, p_browser_major, p_browser_minor, p_browser_patch, NOW())
    ON CONFLICT (family, major, minor, patch) DO NOTHING;

    SELECT browser.id
    INTO v_browser_id
    FROM browser
    WHERE family = p_browser_family
      AND (major = p_browser_major OR (major IS NULL AND p_browser_major IS NULL))
      AND (minor = p_browser_minor OR (minor IS NULL AND p_browser_minor IS NULL))
      AND (patch = p_browser_patch OR (patch IS NULL AND p_browser_patch IS NULL));


    -- Get or create device_browser_os
    INSERT INTO device_browser_os (device_id, browser_id, os_id)
    VALUES (v_device_id, v_browser_id, v_os_id)
    ON CONFLICT (device_id, browser_id, os_id) DO NOTHING;

    SELECT device_browser_os.id
    INTO v_device_browser_os_id
    FROM device_browser_os
    WHERE device_id = v_device_id
      AND browser_id = v_browser_id
      AND os_id = v_os_id;

    -- Get or create client
    RETURN QUERY
        INSERT INTO client (user_id, device_browser_os_id, created_at)
            VALUES (p_user_id, v_device_browser_os_id, NOW())
            ON CONFLICT (user_id, device_browser_os_id)
                DO UPDATE SET created_at = client.created_at
            RETURNING client.id, client.created_at, client.user_id, client.device_browser_os_id;

END;
$$;

alter function client_get_or_create(
    uuid,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar,
    varchar
    ) owner to zavx0z;

