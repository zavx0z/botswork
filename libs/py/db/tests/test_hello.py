"""Hello unit test module."""

from py_db.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello py-db"
