from sqlalchemy import UniqueConstraint, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref

from py_db.client import Device, Browser, OS
from py_db.shared import Base


class DeviceBrowserOs(Base):
    __tablename__ = "device_browser_os"
    __table_args__ = (UniqueConstraint('device_id', 'browser_id', 'os_id', name='unique_device_browser_os'),)

    id = Column(Integer, primary_key=True)

    device = relationship(Device, backref=backref('device_browser_os_entries'))
    device_id = Column(Integer, ForeignKey('device.id'))

    browser = relationship(Browser, backref=backref('device_browser_os_entries'))
    browser_id = Column(Integer, ForeignKey('browser.id'))

    os = relationship(OS, backref=backref('device_browser_os_entries'))
    os_id = Column(Integer, ForeignKey('os.id'))

    client = relationship("Client", back_populates="device_browser_os")
