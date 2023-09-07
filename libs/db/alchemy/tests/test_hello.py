"""Hello unit test module."""

from db_alchemy.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello db-alchemy"
